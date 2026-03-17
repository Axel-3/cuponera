'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase'
import { Coupon } from '@/types'

// Romantic pastel palette
const COUPON_COLORS = [
  '#FFB3C6', // Rose pink
  '#FFCCD5', // Blush
  '#FFC8DD', // Flamingo
  '#FFAFCC', // Hot pink light
  '#F4ACB7', // Dusty rose
  '#E8A0BF', // Mauve pink
  '#F7C5D5', // Ballet pink
  '#FADADD', // Pearl pink
  '#FFD6E0', // Baby pink
  '#F9C6CF', // Salmon pink
  '#EFC3CF', // Antique rose
  '#FAB8C4', // Carnation
]

type CreateInput = {
  title: string
  description: string
  valid_until: string | null
  status: 'available' | 'used'
}

export function useCoupons() {
  const supabase = useMemo(() => createClient(), [])
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCoupons = useCallback(async () => {
    setLoading(true)
    // Timeout: if Supabase hangs (expired session), stop loading after 8s
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 8000)

    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: true })

      clearTimeout(timeout)

      if (error) {
        // Auth error → session expired, redirect to login
        if (error.code === 'PGRST301' || error.message?.includes('JWT')) {
          window.location.href = '/login'
          return
        }
      }

      if (!error && data) {
        const withColors = data.map((c, i) => ({
          ...c,
          color: c.color || COUPON_COLORS[i % COUPON_COLORS.length],
        }))
        setCoupons(withColors)
      }
    } catch {
      clearTimeout(timeout)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchCoupons()
  }, [fetchCoupons])

  const createCoupon = async (data: CreateInput) => {
    const { data: { user } } = await supabase.auth.getUser()
    const color = COUPON_COLORS[coupons.length % COUPON_COLORS.length]
    const { error } = await supabase.from('coupons').insert({
      title: data.title,
      description: data.description,
      valid_until: data.valid_until || null,
      status: data.status,
      used: data.status === 'used',
      color,
      border_color: color,
      owner: user?.id ?? null,
    })
    if (!error) await fetchCoupons()
    return { error }
  }

  const updateCoupon = async (id: string, data: Partial<Coupon>) => {
    const { error } = await supabase.from('coupons').update(data).eq('id', id)
    if (!error) await fetchCoupons()
    return { error }
  }

  const deleteCoupon = async (id: string) => {
    const { error } = await supabase.from('coupons').delete().eq('id', id)
    if (!error) await fetchCoupons()
    return { error }
  }

  const toggleUsed = async (coupon: Coupon) => {
    const isUsed = coupon.status === 'available'
    const { error } = await supabase.from('coupons').update({
      status: isUsed ? 'used' : 'available',
      used: isUsed,
      used_at: isUsed ? new Date().toISOString() : null,
    }).eq('id', coupon.id)
    if (!error) await fetchCoupons()
    return { error }
  }

  return { coupons, loading, fetchCoupons, createCoupon, updateCoupon, deleteCoupon, toggleUsed }
}
