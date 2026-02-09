import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createConsultantSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
});

export async function GET() {
  try {
    const consultants = await prisma.designConsultant.findMany({
      include: { vehicles: { include: { _count: { select: { leads: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(consultants);
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return NextResponse.json({ error: 'Failed to fetch consultants' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createConsultantSchema.parse(body);

    const consultant = await prisma.designConsultant.create({ data });
    return NextResponse.json(consultant, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    console.error('Error creating consultant:', error);
    return NextResponse.json({ error: 'Failed to create consultant' }, { status: 500 });
  }
}
