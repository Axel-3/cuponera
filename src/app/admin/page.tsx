'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/Navbar'
import AdminPanel from '@/components/AdminPanel'

export default function AdminPage() {
  const { role, loading } = useAuth()
  const router = useRouter()

  // Guard: non-admins are redirected to dashboard
  useEffect(() => {
    if (!loading && role !== 'admin') {
      router.replace('/dashboard')
    }
  }, [role, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Cargando...</p>
      </div>
    )
  }

  if (role !== 'admin') return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl sm:text-3xl text-gray-800 mb-1">
            Panel Administrativo
          </h1>
          <p className="text-gray-400 text-sm">
            Crea, edita y gestiona todos los cupones
          </p>
        </div>
        <AdminPanel />
      </main>
    </div>
  )
}
