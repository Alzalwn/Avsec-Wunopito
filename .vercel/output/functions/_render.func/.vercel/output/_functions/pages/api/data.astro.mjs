import { r as readDb } from '../../chunks/db_DqPswBXW.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;

async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
