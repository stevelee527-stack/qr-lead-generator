import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod'; // Assuming z is used elsewhere, though not strictly needed for DELETE if just ID
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

// Helper to check auth
async function checkAuth(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const payload = await verifyToken(token);
    return !!payload;
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    if (!await checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = params;
        await prisma.designConsultant.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete consultant' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    if (!await checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = params;
        const body = await request.json();
        // Basic validation could be added here
        const consultant = await prisma.designConsultant.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(consultant);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update consultant' }, { status: 500 });
    }
}
