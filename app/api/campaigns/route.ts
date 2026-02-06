import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createCampaignSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  userId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, userId } = createCampaignSchema.parse(body);

    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const where = userId ? { userId } : {};

    const campaigns = await prisma.campaign.findMany({
      where,
      include: {
        _count: {
          select: {
            qrCodes: true,
            landingPages: true,
            leads: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
