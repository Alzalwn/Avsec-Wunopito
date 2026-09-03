import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Nonaktifkan cache Vercel & Next.js sepenuhnya
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function GET() {
  try {
    const supabase = getSupabase()

    const [
      { data: personnel },
      { data: docs },
      { data: announcements },
      { data: reports },
      { data: emergencyContacts },
      { data: logbookCategories }
    ] = await Promise.all([
      supabase.from('personnel').select('*').order('created_at', { ascending: true }),
      supabase.from('docs').select('*').order('created_at', { ascending: true }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('reports').select('*').order('created_at', { ascending: false }),
      supabase.from('emergency_contacts').select('*').order('created_at', { ascending: true }),
      supabase.from('logbook_categories').select('*').order('created_at', { ascending: true }),
    ])

    // Remap snake_case ke camelCase untuk logbook categories
    const logbookMapped = (logbookCategories || []).map(c => ({
      ...c,
      nativeUrl: c.native_url,
      sheetsUrl: c.sheets_url,
    }))

    return NextResponse.json(
      {
        personnel: personnel || [],
        docs: docs || [],
        announcements: announcements || [],
        reports: reports || [],
        emergencyContacts: emergencyContacts || [],
        logbookCategories: logbookMapped,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
        },
      }
    )
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
