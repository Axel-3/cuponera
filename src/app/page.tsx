import { redirect } from 'next/navigation'

// Middleware handles auth-based redirection.
// This page just sends everyone to /dashboard as default.
export default function Home() {
  redirect('/dashboard')
}
