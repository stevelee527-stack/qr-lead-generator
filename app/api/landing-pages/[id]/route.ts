import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateLandingPageSchema = z.object({
  name: z.string().min(1).optional(),
  content: z.any().optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const landingPageId = params.id;
    const body = await request.json();
    const updates = updateLandingPageSchema.parse(body);

    const landingPage = await prisma.landingPage.update({
      where: { id: landingPageId },
      data: updates,
    });

    return NextResponse.json(landingPage);
  } catch (error) {
    console.error('Error updating landing page:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update landing page' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const landingPageId = params.id;

    await prisma.landingPage.delete({
      where: { id: landingPageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting landing page:', error);
    return NextResponse.json(
      { error: 'Failed to delete landing page' },
      { status: 500 }
    );
  }
}
