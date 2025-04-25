import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      vendorName,
      bankAccountNo,
      bankName,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
    } = body

    const newVendor = await prisma.vendor.create({
      data: {
        vendorName,
        bankAccountNo,
        bankName,
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
      },
    })

    return NextResponse.json(newVendor)
  } catch (error) {
    console.error('Error creating vendor:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
