
import Navbar from '@/app/components/Navbar'
import VendorForm from '@/app/components/VendorForm'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const vendor = await prisma.vendor.findUnique({ where: { id: params.id } })

  if (!vendor) return <div>Vendor not found</div>

  const { id, createdAt, updatedAt, ...vendorData } = vendor

const initialData = {
  vendorName: vendorData.vendorName || '',
  bankAccountNo: vendorData.bankAccountNo || '',
  bankName: vendorData.bankName || '',
  addressLine1: vendorData.addressLine1 || '',
  addressLine2: vendorData.addressLine2 || '',
  city: vendorData.city || '',
  country: vendorData.country || '',
  zipCode: vendorData.zipCode || '',
}

  return (
    <div className="p-4 py-24">
      <VendorForm id={vendor.id} initialData={initialData} />
    </div>
  )
}
