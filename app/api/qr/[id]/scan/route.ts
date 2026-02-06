import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const qrCodeId = params.id;

    // Increment scan count
    const qrCode = await prisma.qRCode.update({
      where: { id: qrCodeId },
      data: {
        scans: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      scans: qrCode.scans 
    });
  } catch (error) {
    console.error('Error tracking QR scan:', error);
    return NextResponse.json(
      { error: 'Failed to track scan' },
      { status: 500 }
    );
  }
}
