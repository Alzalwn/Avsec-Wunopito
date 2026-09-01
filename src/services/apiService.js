export async function fetchPortalData() {
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function savePersonnel(payload) {
  const res = await fetch('/api/personnel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save personnel');
  return res.json();
}

export async function deletePersonnel(id) {
  const res = await fetch('/api/personnel', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete personnel');
  return res.json();
}

export async function saveDoc(payload) {
  const res = await fetch('/api/docs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save document');
  return res.json();
}

export async function deleteDoc(id) {
  const res = await fetch('/api/docs', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete document');
  return res.json();
}

export async function saveAnnouncement(payload) {
  const res = await fetch('/api/announcements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save announcement');
  return res.json();
}

export async function deleteAnnouncement(id) {
  const res = await fetch('/api/announcements', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete announcement');
  return res.json();
}

export async function saveContact(payload) {
  const res = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save contact');
  return res.json();
}

export async function deleteContact(id) {
  const res = await fetch('/api/contacts', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return res.json();
}

export async function saveReport(payload) {
  const res = await fetch('/api/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save report');
  return res.json();
}

export async function deleteReports(payload) {
  const res = await fetch('/api/reports', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to delete reports');
  return res.json();
}

export async function saveLogbookCategory(payload) {
  const res = await fetch('/api/logbooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save logbook category');
  return res.json();
}

export async function deleteLogbookCategory(id) {
  const res = await fetch('/api/logbooks', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete logbook category');
  return res.json();
}
