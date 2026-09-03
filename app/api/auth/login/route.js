import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function POST(req) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username dan password wajib diisi.' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    const { data: personnel, error } = await supabase
      .from('personnel')
      .select('*')

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const trimmedInput = username.trim().toLowerCase()
    const person = (personnel || []).find(
      p =>
        (p.username?.toLowerCase() === trimmedInput ||
          p.id_pas?.toLowerCase() === trimmedInput) &&
        p.password_default === password
    )

    if (!person) {
      return NextResponse.json(
        { success: false, error: 'Kredensial tidak valid. Periksa kembali ID Pas / Username dan Password Anda.' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: person.id,
        username: person.username,
        id_pas: person.id_pas,
        nama_lengkap: person.nama,
        role: person.role || 'USER',
        is_first_login: person.is_first_login ?? true,
      },
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
