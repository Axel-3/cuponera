'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase'

export interface AppSettings {
  song_url: string
  song_title: string
}

const DEFAULTS: AppSettings = {
  song_url: '',
  song_title: 'Nuestra canción',
}

export function useSettings() {
  const supabase = useMemo(() => createClient(), [])
  const [settings, setSettings] = useState<AppSettings>(DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const { data } = await supabase.from('settings').select('key, value')
        if (!mounted || !data) return
        const map: Record<string, string> = {}
        data.forEach((row: { key: string; value: string }) => {
          map[row.key] = row.value
        })
        setSettings({
          song_url: map['song_url'] ?? '',
          song_title: map['song_title'] ?? 'Nuestra canción',
        })
      } catch {
        // settings table may not exist yet
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [supabase])

  const saveMusic = async (song_url: string, song_title: string) => {
    await supabase.from('settings').upsert(
      [
        { key: 'song_url', value: song_url },
        { key: 'song_title', value: song_title },
      ],
      { onConflict: 'key' }
    )
    setSettings({ song_url, song_title })
  }

  return { settings, loading, saveMusic }
}
