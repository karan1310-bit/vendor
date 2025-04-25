import Link from 'next/link'
import { Providers } from './providers'
import { getServerSession } from 'next-auth'
import { authOptions } from './lib/auth'
import Navbar from './components/Navbar'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <Providers>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-4xl font-bold mb-4">Vendor Management App</h1>
        {session?.user ? (
          <>
            <p className="mb-6 text-lg">Hi, {session.user.name}! What would you like to do today?</p>
            <div className="flex gap-4">
              <Link href="/vendors" className="btn px-6 py-2 bg-black text-white rounded shadow">
                View Vendors
              </Link>
              <Link href="/vendors/new" className="btn px-6 py-2 border border-black text-black rounded shadow">
                Add Vendor
              </Link>
            </div>
          </>
        ) : (
          <p className="text-lg">Please sign in using Google to access the app.</p>
        )}
      </div>
    </Providers>
  )
}
