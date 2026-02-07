import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSimpleQRCode } from '@/lib/qr-generator';
import { z } from 'zod';

const createQRSchema = z.object({
  campaignId: z.string(),
  name: z.string().min(1),
  landingPageSlug: z.string().optional(),
  vehicleId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, name, landingPageSlug, vehicleId } = createQRSchema.parse(body);

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

    // Build the landing page URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const targetUrl = landingPageSlug
      ? `${baseUrl}/landing/${landingPageSlug}`
      : `${baseUrl}/landing/default`;

    // Generate QR code
    const qrCodeDataUrl = await generateSimpleQRCode(targetUrl);

    // Save to database
    const qrCode = await prisma.qRCode.create({
      data: {
        campaignId,
        name,
        url: targetUrl,
        imageUrl: qrCodeDataUrl,
        vehicleId: vehicleId || null,
      },
    });

    return NextResponse.json(qrCode);
  } catch (error) {
    console.error('Error creating QR code:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create QR code' },
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

    const qrCodes = await prisma.qRCode.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(qrCodes);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    );
  }
}
