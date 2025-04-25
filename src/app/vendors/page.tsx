// 👇 THIS LINE IS CRUCIAL
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function VendorListPage() {
  const vendors = await prisma.vendor.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        

        <h1 className="text-3xl font-bold mb-6 text-center">Vendors</h1>

        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Vendor Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Bank Account No</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Bank Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4">{vendor.vendorName}</td>
                  <td className="px-6 py-4">{vendor.bankAccountNo}</td>
                  <td className="px-6 py-4">{vendor.bankName}</td>
                  <td className="px-6 py-4">
                    <Link href={`/vendors/${vendor.id}/edit`} className="text-blue-500 hover:underline mr-3">
                      Edit
                    </Link>
                    <Link href={`/vendors/${vendor.id}/delete`} className="text-red-500 hover:underline">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          href="/"
          className="inline-block mt-4 text-sm border border-gray-300 px-3 py-1 rounded hover:text-gray-600"
        >
          ← Back to Home
        </Link>
      </div>
    </>
  )
}
