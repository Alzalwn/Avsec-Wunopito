import { readDb, writeDb } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db.emergencyContacts || []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  try {
    const item = await request.json();
    const db = readDb();
    
    if (item.id) {
      const idx = db.emergencyContacts.findIndex(c => String(c.id) === String(item.id));
      if (idx !== -1) {
        db.emergencyContacts[idx] = { ...db.emergencyContacts[idx], ...item };
      } else {
        db.emergencyContacts.push(item);
      }
    } else {
      const newId = String(Date.now());
      db.emergencyContacts.push({ ...item, id: newId });
    }

    writeDb(db);
    return new Response(JSON.stringify({ success: true, emergencyContacts: db.emergencyContacts }), {
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
    db.emergencyContacts = db.emergencyContacts.filter(c => String(c.id) !== String(id));
    writeDb(db);
    return new Response(JSON.stringify({ success: true, emergencyContacts: db.emergencyContacts }), {
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
