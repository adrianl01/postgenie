import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { auth } from '@clerk/nextjs'

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, content, hashtags } = body

    const { data, error } = await supabase
      .from('posts')
      .insert([{ user_id: userId, title, content, hashtags }])

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
