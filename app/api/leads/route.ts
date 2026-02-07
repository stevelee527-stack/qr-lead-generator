import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, createLeadNotificationEmail } from '@/lib/email';
import { z } from 'zod';

const createLeadSchema = z.object({
  campaignId: z.string(),
  landingPageId: z.string().optional(),
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  metadata: z.any().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const leadData = createLeadSchema.parse(body);

    // Create lead in database
    const lead = await prisma.lead.create({
      data: leadData,
      include: {
        campaign: true,
        landingPage: true,
      },
    });

    // Send email notification to consultant
    const consultantEmail = process.env.CONSULTANT_EMAIL;

    if (consultantEmail) {
      const emailContent = createLeadNotificationEmail({
        name: lead.name || undefined,
        email: lead.email,
        phone: lead.phone || undefined,
        address: lead.address || undefined,
        message: lead.message || undefined,
        campaignName: lead.campaign.name,
        landingPageName: lead.landingPage?.name,
        metadata: lead.metadata,
      });

      await sendEmail({
        to: consultantEmail,
        ...emailContent,
      });
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

    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    const where = campaignId ? { campaignId } : {};

    const leads = await prisma.lead.findMany({
      where,
      include: {
        campaign: true,
        landingPage: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
