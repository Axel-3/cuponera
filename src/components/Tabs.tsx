'use client'

import { motion } from 'framer-motion'

export type TabOption = 'all' | 'available' | 'used'

interface TabsProps {
  active: TabOption
  onChange: (tab: TabOption) => void
  counts: { all: number; available: number; used: number }
}

const TABS: { key: TabOption; label: string }[] = [
  { key: 'available', label: 'Disponibles' },
  { key: 'used', label: 'Usados' },
  { key: 'all', label: 'Todos' },
]

export default function Tabs({ active, onChange, counts }: TabsProps) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className="relative flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap min-w-[100px] sm:min-w-0"
        >
          {active === tab.key && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute inset-0 bg-white rounded-lg shadow-sm"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors ${
              active === tab.key ? 'text-gray-800' : 'text-gray-500'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-50">
              ({counts[tab.key]})
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}
