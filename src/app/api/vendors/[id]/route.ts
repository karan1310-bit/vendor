import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// ✅ Update Vendor
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()

    const updatedVendor = await prisma.vendor.update({
      where: { id: params.id },
      data: body,
    })

    return NextResponse.json(updatedVendor)
  } catch (err) {
    console.error('Error updating vendor:', err)
    return new NextResponse('Error updating vendor', { status: 500 })
  }
}

// ✅ Delete Vendor
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.vendor.delete({
      where: { id: params.id },
    })

    return new NextResponse('Vendor deleted', { status: 200 })
  } catch (err) {
    console.error('Error deleting vendor:', err)
    return new NextResponse('Error deleting vendor', { status: 500 })
  }
}