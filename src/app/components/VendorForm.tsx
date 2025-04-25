'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const formSchema = z.object({
  vendorName: z.string().min(1, 'Vendor Name is required'),
  bankAccountNo: z.string().min(1, 'Bank Account No is required'),
  bankName: z.string().min(1, 'Bank Name is required'),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function VendorForm({
  initialData,
  id,
}: {
  initialData?: FormData
  id?: string
}) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  })

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof FormData, value)
      })
    }
  }, [initialData, setValue])

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`/api/vendors${id ? `/${id}` : ''}`, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.push('/vendors')
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {id ? 'Edit Vendor' : 'Create New Vendor'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('vendorName')}
            placeholder="Vendor Name *"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="text-sm text-red-500 mt-1">{errors.vendorName?.message}</p>
        </div>

        <div>
          <input
            {...register('bankAccountNo')}
            placeholder="Bank Account No *"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="text-sm text-red-500 mt-1">{errors.bankAccountNo?.message}</p>
        </div>

        <div>
          <input
            {...register('bankName')}
            placeholder="Bank Name *"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="text-sm text-red-500 mt-1">{errors.bankName?.message}</p>
        </div>

        <div>
          <input
            {...register('addressLine1')}
            placeholder="Address Line 1"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            {...register('addressLine2')}
            placeholder="Address Line 2"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            {...register('city')}
            placeholder="City"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            {...register('country')}
            placeholder="Country"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            {...register('zipCode')}
            placeholder="Zip Code"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900 transition-all"
        >
          {id ? 'Update Vendor' : 'Create Vendor'}
        </button>
      </div>
    </form>
  )
}
