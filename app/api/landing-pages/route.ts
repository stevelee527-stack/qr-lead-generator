import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { defaultLandingPage } from '@/lib/landing-page-templates';

const createLandingPageSchema = z.object({
  campaignId: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  content: z.any().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, name, slug, content } = createLandingPageSchema.parse(body);

    // Check if slug is already taken
    const existing = await prisma.landingPage.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A landing page with this slug already exists' },
        { status: 400 }
      );
    }

    // Verify campaign exists
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Create landing page with default template
    const landingPage = await prisma.landingPage.create({
      data: {
        campaignId,
        name,
        slug,
        content: content || defaultLandingPage,
        isPublished: false,
      },
    });

    return NextResponse.json(landingPage);
  } catch (error) {
    console.error('Error creating landing page:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create landing page' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    const landingPages = await prisma.landingPage.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(landingPages);
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch landing pages' },
      { status: 500 }
    );
  }
}
