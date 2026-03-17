'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Coupon } from '@/types'

interface CouponModalProps {
  coupon: Coupon | null
  onClose: () => void
  isAdmin?: boolean
  onToggleUsed?: () => void
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Sin fecha de vencimiento'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function CouponModal({ coupon, onClose, isAdmin, onToggleUsed }: CouponModalProps) {
  const color = coupon?.color ?? '#F4BFC6'
  const isUsed = coupon?.status === 'used'

  return (
    <AnimatePresence>
      {coupon && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.88, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 32 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.45 }}
              className="relative w-full max-w-md pointer-events-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={{ border: `6px solid ${color}` }}
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-sm font-medium"
              >✕</button>

              {/* Header */}
              <div className="px-6 pt-6 pb-4" style={{ borderBottom: `2px dashed rgba(100,100,100,0.15)` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Cuponcito 💌</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-gray-800 leading-tight pr-8">{coupon.title}</h2>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{coupon.description}</p>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-sm text-gray-400">
                    <span className="block text-xs uppercase tracking-wider mb-0.5">Válido hasta</span>
                    <span className="text-gray-600 font-medium">{formatDate(coupon.valid_until)}</span>
                  </div>
                  <motion.span
                    key={coupon.status}
                    initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                    className="text-xs font-bold tracking-widest border-2 px-3 py-1 rounded-full"
                    style={{ color: isUsed ? '#9ca3af' : color, borderColor: isUsed ? '#e5e7eb' : color }}
                  >
                    {isUsed ? 'USADO' : 'DISPONIBLE'}
                  </motion.span>
                </div>

                {isAdmin && onToggleUsed && (
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={onToggleUsed}
                    className="w-full py-3 rounded-xl font-medium text-sm transition-all"
                    style={{ background: isUsed ? 'white' : color, color: isUsed ? color : 'white', border: `2px solid ${color}` }}
                  >
                    {isUsed ? '↩ Marcar como disponible' : '✓ Marcar como usado'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
