'use client'

import { useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase'

export default function SessionKeepAlive() {
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const refresh = async () => {
      await supabase.auth.refreshSession()
    }
    const interval = setInterval(refresh, 45 * 60 * 1000)
    return () => clearInterval(interval)
  }, [supabase])

  return null
}
