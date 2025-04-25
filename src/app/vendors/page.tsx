import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function VendorListPage() {
  const vendors = await prisma.vendor.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Vendors</h1>

        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Vendor Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Bank Account No.</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Bank Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.vendorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.bankAccountNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.bankName}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <Link
                      href={`/vendors/${vendor.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/vendors/${vendor.id}/delete`}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-black hover:text-gray-600 border border-gray-300 px-3 py-1 rounded transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  )
}
