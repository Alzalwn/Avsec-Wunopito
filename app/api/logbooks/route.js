import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Helper: camelCase -> snake_case untuk kolom logbook
function toDbFormat(item) {
  return {
    id: item.id,
    title: item.title,
    url: item.url,
    native_url: item.nativeUrl || item.native_url || item.url,
    sheets_url: item.sheetsUrl || item.sheets_url || '',
  }
}

// Helper: snake_case -> camelCase untuk response
function toClientFormat(item) {
  return {
    ...item,
    nativeUrl: item.native_url,
    sheetsUrl: item.sheets_url,
  }
}

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase.from('logbook_categories').select('*').order('created_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ logbookCategories: (data || []).map(toClientFormat) })
}

export async function POST(request) {
  try {
    const supabase = getSupabase()
    const item = await request.json()
    const dbItem = toDbFormat(item)

    if (item.id) {
      const { error } = await supabase.from('logbook_categories').upsert(dbItem)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      const newId = item.title.toLowerCase().replace(/\s+/g, '_')
      const { error } = await supabase.from('logbook_categories').insert({ ...dbItem, id: newId })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: all } = await supabase.from('logbook_categories').select('*').order('created_at', { ascending: true })
    return NextResponse.json({ success: true, logbookCategories: (all || []).map(toClientFormat) })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const supabase = getSupabase()
    const { id } = await request.json()
    const { error } = await supabase.from('logbook_categories').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const { data: all } = await supabase.from('logbook_categories').select('*').order('created_at', { ascending: true })
    return NextResponse.json({ success: true, logbookCategories: (all || []).map(toClientFormat) })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
