export type Role = 'admin' | 'user'
export type CouponStatus = 'available' | 'used'

export interface Profile {
  id: string
  role: Role
  created_at: string
}

export interface Coupon {
  id: string
  title: string
  description: string
  color: string | null
  border_color: string | null
  valid_until: string | null
  used: boolean
  used_at: string | null
  status: CouponStatus
  created_at: string
  owner: string | null
}
