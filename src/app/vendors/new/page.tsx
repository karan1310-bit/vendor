
import Navbar from '@/app/components/Navbar'
import VendorForm from '@/app/components/VendorForm'
import { Providers } from '@/app/providers'

export default function NewVendorPage() {
  return (
    <Providers>
      <div className="p-4 py-24">
        
        <VendorForm />
      </div>
    </Providers>
  )
}
