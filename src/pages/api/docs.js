import { readDb, writeDb } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db.docs || []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  try {
    const docData = await request.json();
    const db = readDb();
    
    if (docData.id) {
      // Update existing
      const index = db.docs.findIndex(d => String(d.id) === String(docData.id));
      if (index !== -1) {
        db.docs[index] = { ...db.docs[index], ...docData };
      } else {
        db.docs.push(docData);
      }
    } else {
      // Create new
      const newId = String(Date.now());
      db.docs.push({ ...docData, id: newId });
    }

    writeDb(db);
    return new Response(JSON.stringify({ success: true, docs: db.docs }), {
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
    db.docs = db.docs.filter(d => String(d.id) !== String(id));
    writeDb(db);
    return new Response(JSON.stringify({ success: true, docs: db.docs }), {
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
