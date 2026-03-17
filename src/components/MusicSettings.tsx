'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '@/hooks/useSettings'

export default function MusicSettings() {
  const { settings, saveSetting } = useSettings()
  const [url, setUrl] = useState(settings.song_url)
  const [title, setTitle] = useState(settings.song_title)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await saveSetting('song_url', url)
    await saveSetting('song_title', title)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white transition-all placeholder:text-gray-300'

  return (
    <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">🎵</span>
        <h3 className="font-medium text-gray-700">Canción de la cuponera</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la canción
        </label>
        <input
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nuestra canción"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL del archivo de audio (MP3)
        </label>
        <input
          className={inputClass}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://... enlace directo a un archivo .mp3"
        />
        <p className="text-xs text-gray-400 mt-1">
          Puedes subir el MP3 a Google Drive, Dropbox o cualquier hosting y pegar el enlace directo aquí.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        disabled={saving}
        className="w-full py-2.5 rounded-xl bg-pink-400 hover:bg-pink-500 text-white text-sm font-medium transition-colors disabled:opacity-60"
      >
        {saved ? '✓ Guardado' : saving ? 'Guardando...' : 'Guardar canción'}
      </motion.button>
    </div>
  )
}
