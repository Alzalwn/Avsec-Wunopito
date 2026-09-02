import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase.from('reports').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ reports: data })
}

export async function POST(request) {
  try {
    const supabase = getSupabase()
    const item = await request.json()
    if (item.id) {
      const { error } = await supabase.from('reports').upsert({ ...item })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      const newId = `RPT-${Date.now().toString().slice(-4)}`
      const { error } = await supabase.from('reports').insert({ ...item, id: newId })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const { data: all } = await supabase.from('reports').select('*').order('created_at', { ascending: false })
    return NextResponse.json({ success: true, reports: all })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const supabase = getSupabase()
    const body = await request.json()

    if (body.id) {
      // Single delete
      const { error } = await supabase.from('reports').delete().eq('id', body.id)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    } else if (body.ids && Array.isArray(body.ids)) {
      // Bulk delete
      const { error } = await supabase.from('reports').delete().in('id', body.ids)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: all } = await supabase.from('reports').select('*').order('created_at', { ascending: false })
    return NextResponse.json({ success: true, reports: all })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
