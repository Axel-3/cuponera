'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coupon } from '@/types'

export type CouponFormData = {
  title: string
  description: string
  valid_until: string | null
  status: 'available' | 'used'
}

interface CouponFormProps {
  initial?: Partial<Coupon>
  onSubmit: (data: CouponFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const inputClass =
  'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white transition-all placeholder:text-gray-300'

export default function CouponForm({ initial, onSubmit, onCancel, loading }: CouponFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [valid_until, setValidUntil] = useState(initial?.valid_until ?? '')
  const [status, setStatus] = useState<'available' | 'used'>(initial?.status ?? 'available')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ title, description, valid_until: valid_until || null, status })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-pink-400">*</span>
        </label>
        <input
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Cena romántica"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción <span className="text-pink-400">*</span>
        </label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cupón válido por una cena romántica donde tú elijas"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Válido hasta</label>
        <input
          type="date"
          className={inputClass}
          value={valid_until ?? ''}
          onChange={(e) => setValidUntil(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select
          className={inputClass}
          value={status}
          onChange={(e) => setStatus(e.target.value as 'available' | 'used')}
        >
          <option value="available">Disponible</option>
          <option value="used">Usado</option>
        </select>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-pink-400 hover:bg-pink-500 text-white text-sm font-medium transition-colors disabled:opacity-60"
        >
          {loading ? 'Guardando...' : 'Guardar cupón'}
        </motion.button>
      </div>
    </form>
  )
}
