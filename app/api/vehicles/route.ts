import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSimpleQRCode } from '@/lib/qr-generator';
import { z } from 'zod';

const createVehicleSchema = z.object({
  year: z.number().int().min(1900).max(2100),
  make: z.string().min(1),
  model: z.string().min(1),
  vehicleNumber: z.string().optional(),
  consultantId: z.string().min(1),
});

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        consultant: true,
        _count: { select: { leads: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createVehicleSchema.parse(body);

    // Create the vehicle first to get the ID
    const vehicle = await prisma.vehicle.create({ data });

    // Generate QR code pointing to the public lead form
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const vehicleUrl = `${appUrl}/vehicle/${vehicle.id}`;
    const qrCodeUrl = await generateSimpleQRCode(vehicleUrl);

    // Update vehicle with QR code
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicle.id },
      data: { qrCodeUrl },
      include: { consultant: true },
    });

    return NextResponse.json(updatedVehicle, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
