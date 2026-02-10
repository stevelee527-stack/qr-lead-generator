import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, createLeadNotificationEmail } from '@/lib/email';
import { z } from 'zod';

const createLeadSchema = z.object({
  vehicleId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  windowCount: z.enum(['1-5', '5-10', '10+']),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const leadData = createLeadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: leadData,
      include: {
        vehicle: {
          include: { consultant: true },
        },
      },
    });

    // Send email notification to the DC
    const dcEmail = lead.vehicle.consultant.email;
    if (dcEmail) {
      const { year, make, model } = lead.vehicle;
      const emailContent = createLeadNotificationEmail({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || undefined,
        message: lead.message || undefined,
        vehicleInfo: `${year} ${make} ${model}`,
        consultantName: lead.vehicle.consultant.name,
      });

      await sendEmail({ to: dcEmail, ...emailContent });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error creating lead:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        vehicle: {
          include: { consultant: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
