import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const consultantSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
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
        const consultants = await prisma.designConsultant.findMany({
            orderBy: { createdAt: 'desc' },
            include: { _count: { select: { vehicles: true } } }
        });
        return NextResponse.json(consultants);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch consultants' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!await checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const data = consultantSchema.parse(body);

        const existing = await prisma.designConsultant.findUnique({
            where: { email: data.email }
        });

        if (existing) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

        const consultant = await prisma.designConsultant.create({
            data
        });

        return NextResponse.json(consultant);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create consultant' }, { status: 500 });
    }
}
