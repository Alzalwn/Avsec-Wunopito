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
  const { data, error } = await supabase.from('emergency_contacts').select('*').order('created_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ emergencyContacts: data })
}

export async function POST(request) {
  try {
    const supabase = getSupabase()
    const item = await request.json()
    if (item.id) {
      const { error } = await supabase.from('emergency_contacts').upsert({ ...item })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      const { error } = await supabase.from('emergency_contacts').insert({ ...item })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const { data: all } = await supabase.from('emergency_contacts').select('*').order('created_at', { ascending: true })
    return NextResponse.json({ success: true, emergencyContacts: all })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const supabase = getSupabase()
    const { id } = await request.json()
    const { error } = await supabase.from('emergency_contacts').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const { data: all } = await supabase.from('emergency_contacts').select('*').order('created_at', { ascending: true })
    return NextResponse.json({ success: true, emergencyContacts: all })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
