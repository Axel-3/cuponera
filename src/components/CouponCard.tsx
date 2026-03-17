'use client'

import { motion } from 'framer-motion'
import { Coupon } from '@/types'

interface CouponCardProps {
  coupon: Coupon
  onClick: () => void
  isAdmin?: boolean
  onToggleUsed?: (e: React.MouseEvent) => void
}

function formatDate(dateStr: string | null): string | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('es-MX', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CouponCard({ coupon, onClick, isAdmin, onToggleUsed }: CouponCardProps) {
  const color = coupon.color ?? '#F4BFC6'
  const isUsed = coupon.status === 'used'

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`cursor-pointer ${isUsed ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      <div
        className="relative flex overflow-visible rounded-xl bg-white"
        style={{
          border: `4px solid ${color}`,
          minHeight: '110px',
          filter: isUsed ? 'grayscale(0.35)' : 'none',
        }}
      >
        {/* Left notch */}
        <div className="absolute" style={{
          left: '-12px', top: '50%', transform: 'translateY(-50%)',
          width: '24px', height: '24px', borderRadius: '50%',
          background: '#f9fafb', border: `4px solid ${color}`,
          clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)', zIndex: 10,
        }} />
        {/* Right notch */}
        <div className="absolute" style={{
          right: '-12px', top: '50%', transform: 'translateY(-50%)',
          width: '24px', height: '24px', borderRadius: '50%',
          background: '#f9fafb', border: `4px solid ${color}`,
          clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)', zIndex: 10,
        }} />

        {/* Stub */}
        <div
          className="w-14 flex-shrink-0 flex flex-col items-center justify-center px-1 py-3"
          style={{ borderRight: `2px dashed rgba(100,100,100,0.25)` }}
        >
          <div style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }} className="text-center">
            {coupon.valid_until ? (
              <>
                <span className="text-[7px] font-bold tracking-wide text-gray-500 block mb-0.5">Válido</span>
                <span className="text-[7px] font-bold tracking-wide text-gray-500 block mb-2">Hasta</span>
                <span className="text-[6.5px] font-light text-gray-400 block leading-tight">{formatDate(coupon.valid_until)}</span>
              </>
            ) : (
              <span className="text-[7px] font-bold tracking-wide text-gray-400 block">Sin fecha</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
          <h3 className="font-display text-base text-gray-800 mb-1 leading-tight truncate">{coupon.title}</h3>
          <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">{coupon.description}</p>
          {isUsed && (
            <div className="mt-2">
              <span className="inline-block text-[9px] font-bold tracking-widest border px-2 py-0.5 rounded" style={{ color, borderColor: color }}>
                USADO
              </span>
            </div>
          )}
        </div>

        {/* Admin toggle button */}
        {isAdmin && onToggleUsed && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleUsed(e) }}
            title={isUsed ? 'Marcar disponible' : 'Marcar como usado'}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm text-gray-500 hover:text-gray-700 transition-all text-xs z-20"
          >
            {isUsed ? '↩' : '✓'}
          </button>
        )}
      </div>
    </motion.div>
  )
}
