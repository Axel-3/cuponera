'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
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

  const fetchSettings = useCallback(async () => {
    try {
      const { data } = await supabase.from('settings').select('*')
      if (data) {
        const map: Record<string, string> = {}
        data.forEach((row: { key: string; value: string }) => {
          map[row.key] = row.value
        })
        setSettings({
          song_url: map['song_url'] ?? '',
          song_title: map['song_title'] ?? 'Nuestra canción',
        })
      }
    } catch {
      // settings table may not exist yet
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const saveSetting = async (key: keyof AppSettings, value: string) => {
    await supabase
      .from('settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    await fetchSettings()
  }

  return { settings, loading, saveSetting }
}
