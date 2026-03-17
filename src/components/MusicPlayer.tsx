'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MusicPlayerProps {
  songUrl: string
  songTitle: string
}

export default function MusicPlayer({ songUrl, songTitle }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => setPlaying(false)
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    }
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('timeupdate', onTimeUpdate)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  if (!songUrl) return null

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', bounce: 0.3 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <audio ref={audioRef} src={songUrl} preload="metadata" />

      <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
        {/* Collapsed / header row */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Play / pause */}
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 transition-all"
            style={{ background: playing ? '#F4BFC6' : '#fce7f3' }}
          >
            <span className="text-sm">{playing ? '⏸' : '▶️'}</span>
          </button>

          {/* Title */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex-1 text-left min-w-0"
          >
            <p className="text-xs font-medium text-gray-700 truncate max-w-[130px]">{songTitle}</p>
            <p className="text-[10px] text-gray-400">
              {playing ? '♪ Reproduciendo...' : 'Toca para escuchar'}
            </p>
          </button>

          {/* Minimize */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-gray-300 hover:text-gray-500 text-xs transition-colors"
          >
            {expanded ? '▼' : '▲'}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100 mx-4 mb-3 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: '#F4BFC6', width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Expanded: note */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 text-center">
                <p className="text-[11px] text-pink-400 font-medium">💌 Con amor</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
