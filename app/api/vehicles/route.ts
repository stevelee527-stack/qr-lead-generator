import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const vehicleSchema = z.object({
    tagNumber: z.string().min(1, 'Tag Number is required'),
    vehicleNumber: z.string().min(1, 'Vehicle Number is required'),
    consultantId: z.string().min(1, 'Design Consultant is required'),
});

// Helper to check auth
async function checkAuth(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const payload = await verifyToken(token);
    return !!payload;
}

export async function GET(request: NextRequest) {
    if (!await checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                consultant: true,
                qrCodes: true
            }
        });
        return NextResponse.json(vehicles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!await checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const data = vehicleSchema.parse(body);

        const existing = await prisma.vehicle.findUnique({
            where: { tagNumber: data.tagNumber }
        });

        if (existing) {
            return NextResponse.json({ error: 'Tag Number already exists' }, { status: 400 });
        }

        const vehicle = await prisma.vehicle.create({
            data
        });

        return NextResponse.json(vehicle);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
    }
}
