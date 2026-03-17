'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RulesCard() {
  const [open, setOpen] = useState(true)

  return (
    <div className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-dashed border-pink-200 overflow-hidden shadow-sm"
      >
        {/* Header */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-pink-50/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📜</span>
            <span className="font-display text-base text-gray-700 tracking-wide">REGLAS</span>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400 text-sm"
          >
            ▼
          </motion.span>
        </button>

        {/* Content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 pt-1">
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  Esta cuponera es válida durante un año a partir de su entrega.
                  Para hacer válido cualquier cupón, este debe ser legible.
                  El cupón comodín puede utilizarse para cualquier actividad acordada.
                  Los cupones de comida requieren al menos una semana entre su uso y la entrega.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
