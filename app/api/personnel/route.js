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
  const { data, error } = await supabase.from('personnel').select('*').order('created_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const safeData = (data || []).map(p => {
    const { password_default, ...rest } = p;
    return rest;
  });
  return NextResponse.json({ personnel: safeData })
}

export async function POST(request) {
  try {
    const supabase = getSupabase()
    const item = await request.json()

    let result
    if (item.id) {
      // Update existing
      const { data, error } = await supabase
        .from('personnel')
        .upsert({ ...item })
        .select()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      result = data
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('personnel')
        .insert({ ...item })
        .select()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      result = data
    }

    // Return full updated list without passwords
    const { data: all } = await supabase.from('personnel').select('*').order('created_at', { ascending: true })
    const safeAll = (all || []).map(p => {
      const { password_default, ...rest } = p;
      return rest;
    });
    return NextResponse.json({ success: true, personnel: safeAll })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const supabase = getSupabase()
    const { id } = await request.json()
    const { error } = await supabase.from('personnel').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const { data: all } = await supabase.from('personnel').select('*').order('created_at', { ascending: true })
    const safeAll = (all || []).map(p => {
      const { password_default, ...rest } = p;
      return rest;
    });
    return NextResponse.json({ success: true, personnel: safeAll })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
