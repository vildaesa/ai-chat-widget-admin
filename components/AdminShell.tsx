'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.replace('/login')
      return
    }
    setReady(true)
  }, [router])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!sidebarOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [sidebarOpen])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-3 backdrop-blur lg:hidden">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-slate-900">AI Chat Admin</span>
      </header>

      <main className="min-h-screen p-4 sm:p-6 lg:ml-64 lg:p-8">{children}</main>
    </div>
  )
}
