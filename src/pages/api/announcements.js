import { readDb, writeDb } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db.announcements || []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  try {
    const item = await request.json();
    const db = readDb();
    
    if (item.id) {
      const idx = db.announcements.findIndex(a => String(a.id) === String(item.id));
      if (idx !== -1) {
        db.announcements[idx] = { ...db.announcements[idx], ...item };
      } else {
        db.announcements.push(item);
      }
    } else {
      const newId = String(Date.now());
      db.announcements.unshift({ ...item, id: newId });
    }

    writeDb(db);
    return new Response(JSON.stringify({ success: true, announcements: db.announcements }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE({ request }) {
  try {
    const { id } = await request.json();
    const db = readDb();
    db.announcements = db.announcements.filter(a => String(a.id) !== String(id));
    writeDb(db);
    return new Response(JSON.stringify({ success: true, announcements: db.announcements }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
