import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
        await prisma.vehicle.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
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
        const vehicle = await prisma.vehicle.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(vehicle);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
    }
}
