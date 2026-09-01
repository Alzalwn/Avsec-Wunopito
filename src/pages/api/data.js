import { readDb } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  const db = readDb();
  return new Response(JSON.stringify(db), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
