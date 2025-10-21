'use client'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold">PostGenie</Link>
        <div className="flex gap-4">
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}
