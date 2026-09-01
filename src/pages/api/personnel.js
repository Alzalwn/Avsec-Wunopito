import { readDb, writeDb } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db.personnel || []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  try {
    const item = await request.json();
    const db = readDb();
    
    if (item.id) {
      const idx = db.personnel.findIndex(p => String(p.id) === String(item.id));
      if (idx !== -1) {
        db.personnel[idx] = { ...db.personnel[idx], ...item };
      } else {
        db.personnel.push(item);
      }
    } else {
      const newId = String(Date.now());
      db.personnel.push({ ...item, id: newId });
    }

    writeDb(db);
    return new Response(JSON.stringify({ success: true, personnel: db.personnel }), {
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
    db.personnel = db.personnel.filter(p => String(p.id) !== String(id));
    writeDb(db);
    return new Response(JSON.stringify({ success: true, personnel: db.personnel }), {
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
