'use client'

import { useState, useMemo, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useCoupons } from '@/hooks/useCoupons'
import { useSettings } from '@/hooks/useSettings'
import Navbar from '@/components/Navbar'
import Tabs, { TabOption } from '@/components/Tabs'
import CouponCard from '@/components/CouponCard'
import CouponModal from '@/components/CouponModal'
import RulesCard from '@/components/RulesCard'
import MusicPlayer from '@/components/MusicPlayer'
import { Coupon } from '@/types'

export default function DashboardPage() {
  const { role } = useAuth()
  const { coupons, loading, toggleUsed } = useCoupons()
  const { settings } = useSettings()
  const [activeTab, setActiveTab] = useState<TabOption>('available')
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const filtered = useMemo(() => {
    if (activeTab === 'all') return coupons
    return coupons.filter((c) => c.status === activeTab)
  }, [coupons, activeTab])

  const counts = useMemo(
    () => ({
      all: coupons.length,
      available: coupons.filter((c) => c.status === 'available').length,
      used: coupons.filter((c) => c.status === 'used').length,
    }),
    [coupons]
  )

  const handleToggleUsed = useCallback(async () => {
    if (!selectedCoupon) return
    await toggleUsed(selectedCoupon)
    setSelectedCoupon((prev) =>
      prev ? { ...prev, status: prev.status === 'available' ? 'used' : 'available' } : null
    )
  }, [selectedCoupon, toggleUsed])

  const isUser = role === 'user'

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-2xl sm:text-3xl text-gray-800 mb-1">
            Tu Cuponera 💌
          </h1>
          <p className="text-gray-400 text-sm">Cupones para momentos especiales</p>
        </div>

        {/* Rules — only visible to regular users */}
        {isUser && <RulesCard />}

        {/* Tabs */}
        <div className="mb-6">
          <Tabs active={activeTab} onChange={setActiveTab} counts={counts} />
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-28 bg-white rounded-xl animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  onClick={() => setSelectedCoupon(coupon)}
                  isAdmin={role === 'admin'}
                  onToggleUsed={async () => { await toggleUsed(coupon) }}
                />
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-300">
                  <div className="text-5xl mb-3">🎫</div>
                  <p className="text-sm">
                    {activeTab === 'used'
                      ? 'Aún no has usado ningún cupón'
                      : 'No hay cupones disponibles'}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Modal */}
      <CouponModal
        coupon={selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        isAdmin={role === 'admin'}
        onToggleUsed={handleToggleUsed}
      />

      {/* Music player — only for regular users */}
      {isUser && settings.song_url && (
        <MusicPlayer songUrl={settings.song_url} songTitle={settings.song_title} />
      )}
    </div>
  )
}
