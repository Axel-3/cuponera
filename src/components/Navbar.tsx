'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user, role, signOut } = useAuth()
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-display text-xl text-gray-800 tracking-tight">
          💌 Cuponera
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {role === 'admin' && (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  pathname === '/dashboard'
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Cupones
              </Link>
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  pathname === '/admin'
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Admin
              </Link>
            </>
          )}
          <span className="text-xs text-gray-400 hidden sm:inline truncate max-w-[140px]">
            {user?.email}
          </span>
          <button
            onClick={signOut}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
