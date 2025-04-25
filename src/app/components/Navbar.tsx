'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        VendorApp
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm underline underline-offset-4 hover:text-gray-600">
          Home
        </Link>

        {session?.user ? (
          <>
            <span className="text-sm">Hi, {session.user.name}</span>
            <button
              className="px-4 py-1 text-sm bg-black text-white rounded"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="px-4 py-1 text-sm bg-black text-white rounded"
            onClick={() => signIn('google')}
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  )
}
