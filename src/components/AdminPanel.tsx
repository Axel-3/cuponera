'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Coupon } from '@/types'
import { useCoupons } from '@/hooks/useCoupons'
import CouponForm, { CouponFormData } from './CouponForm'
import MusicSettings from './MusicSettings'

export default function AdminPanel() {
  const { coupons, loading, createCoupon, updateCoupon, deleteCoupon, toggleUsed } = useCoupons()
  const [showCreate, setShowCreate] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const handleCreate = async (data: CouponFormData) => {
    setFormLoading(true)
    await createCoupon(data)
    setFormLoading(false)
    setShowCreate(false)
  }

  const handleUpdate = async (data: CouponFormData) => {
    if (!editingCoupon) return
    setFormLoading(true)
    await updateCoupon(editingCoupon.id, {
      title: data.title,
      description: data.description,
      valid_until: data.valid_until,
      status: data.status,
      used: data.status === 'used',
    })
    setFormLoading(false)
    setEditingCoupon(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este cupón permanentemente?')) return
    await deleteCoupon(id)
  }

  const available = coupons.filter((c) => c.status === 'available').length
  const used = coupons.filter((c) => c.status === 'used').length

  return (
    <div className="space-y-5">
      {/* Music settings */}
      <MusicSettings />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: coupons.length, color: 'text-gray-700' },
          { label: 'Disponibles', value: available, color: 'text-green-600' },
          { label: 'Usados', value: used, color: 'text-gray-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
            <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-gray-800">Gestionar cupones</h2>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => { setEditingCoupon(null); setShowCreate((v) => !v) }}
          className="flex items-center gap-1.5 bg-pink-400 hover:bg-pink-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          {showCreate ? '✕ Cancelar' : '+ Nuevo cupón'}
        </motion.button>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-sm">
              <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Nuevo cupón</h3>
              <CouponForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} loading={formLoading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit form */}
      <AnimatePresence>
        {editingCoupon && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
              <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">
                Editando: {editingCoupon.title}
              </h3>
              <CouponForm
                initial={editingCoupon}
                onSubmit={handleUpdate}
                onCancel={() => setEditingCoupon(null)}
                loading={formLoading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-white rounded-xl animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : (
        <motion.div layout className="space-y-2">
          {coupons.map((coupon) => (
            <motion.div
              key={coupon.id} layout
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: coupon.color ?? '#F4BFC6' }} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{coupon.title}</p>
                <p className="text-xs text-gray-400 truncate">{coupon.description}</p>
              </div>
              <span className={`hidden sm:inline text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                coupon.status === 'available' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {coupon.status === 'available' ? 'Disponible' : 'Usado'}
              </span>
              <div className="flex gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleUsed(coupon)}
                  className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-1.5 rounded-lg transition-colors"
                  title={coupon.status === 'available' ? 'Marcar como usado' : 'Marcar disponible'}
                >
                  {coupon.status === 'available' ? '✓' : '↩'}
                </button>
                <button
                  onClick={() => { setShowCreate(false); setEditingCoupon(coupon) }}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="text-xs bg-red-50 hover:bg-red-100 text-red-500 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  Borrar
                </button>
              </div>
            </motion.div>
          ))}
          {coupons.length === 0 && (
            <p className="text-center text-gray-400 py-12 text-sm">No hay cupones aún. ¡Crea el primero!</p>
          )}
        </motion.div>
      )}
    </div>
  )
}
