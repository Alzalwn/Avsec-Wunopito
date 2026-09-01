import { r as readDb, w as writeDb } from '../../chunks/db_DqPswBXW.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;

async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db.logbookCategories || []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function POST({ request }) {
  try {
    const item = await request.json();
    const db = readDb();
    
    if (item.id) {
      const idx = db.logbookCategories.findIndex(l => String(l.id) === String(item.id));
      if (idx !== -1) {
        db.logbookCategories[idx] = { ...db.logbookCategories[idx], ...item };
      } else {
        db.logbookCategories.push(item);
      }
    } else {
      const newId = `lb_${Date.now()}`;
      db.logbookCategories.push({ ...item, id: newId });
    }

    writeDb(db);
    return new Response(JSON.stringify({ success: true, logbookCategories: db.logbookCategories }), {
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

async function DELETE({ request }) {
  try {
    const { id } = await request.json();
    const db = readDb();
    db.logbookCategories = db.logbookCategories.filter(l => String(l.id) !== String(id));
    writeDb(db);
    return new Response(JSON.stringify({ success: true, logbookCategories: db.logbookCategories }), {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
