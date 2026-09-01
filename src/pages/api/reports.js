import { readDb, writeDb } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db.reports || []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  try {
    const item = await request.json();
    const db = readDb();
    
    if (item.id) {
      const idx = db.reports.findIndex(r => String(r.id) === String(item.id));
      if (idx !== -1) {
        db.reports[idx] = { ...db.reports[idx], ...item };
      } else {
        db.reports.unshift(item);
      }
    } else {
      const newId = `RPT-${Math.floor(100 + Math.random() * 900)}`;
      db.reports.unshift({ ...item, id: newId });
    }

    writeDb(db);
    return new Response(JSON.stringify({ success: true, reports: db.reports }), {
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
    const { id, ids } = await request.json();
    const db = readDb();
    
    if (ids && Array.isArray(ids)) {
      db.reports = db.reports.filter(r => !ids.includes(String(r.id)));
    } else if (id) {
      db.reports = db.reports.filter(r => String(r.id) !== String(id));
    }
    
    writeDb(db);
    return new Response(JSON.stringify({ success: true, reports: db.reports }), {
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
