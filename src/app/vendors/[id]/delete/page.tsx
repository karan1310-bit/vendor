'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DeleteVendor({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(`/api/vendors/${params.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.push('/vendors')
    } else {
      alert('Failed to delete vendor')
    }
  }

  return (
    <>
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
      {/* Back to Home */}
      

      <h1 className="text-2xl font-bold mb-4 text-gray-800">Confirm Delete</h1>
      <p className="mb-6 text-sm text-gray-600">
        Are you sure you want to delete this vendor? This action cannot be undone.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleDelete}
          className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => router.push('/vendors')}
          className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
    <div className="mt-4 text-left">
  <Link
    href="/"
    className="text-sm text-black hover:text-gray-600 border border-gray-300 px-3 py-1 rounded transition-all"
  >
    ← Back to Home
  </Link>
</div>
  </div>
  </>
  )
}
