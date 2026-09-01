import {
  initialPersonnel,
  initialDocs,
  initialAnnouncements,
  initialReports,
  initialEmergencyContacts,
  initialLogbookCategories
} from '../utils/helpers.js';

// Local storage keys for hybrid fallback mode
const STORAGE_KEYS = {
  personnel: 'avsec_personnel_db',
  docs: 'avsec_docs_db',
  announcements: 'avsec_announcements_db',
  reports: 'avsec_reports_db',
  contacts: 'avsec_contacts_db',
  logbooks: 'avsec_logbooks_db'
};

function getLocal(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocal(key, data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export async function fetchPortalData() {
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const data = await res.json();
      if (data.personnel) setLocal(STORAGE_KEYS.personnel, data.personnel);
      if (data.docs) setLocal(STORAGE_KEYS.docs, data.docs);
      if (data.announcements) setLocal(STORAGE_KEYS.announcements, data.announcements);
      if (data.reports) setLocal(STORAGE_KEYS.reports, data.reports);
      if (data.emergencyContacts) setLocal(STORAGE_KEYS.contacts, data.emergencyContacts);
      if (data.logbookCategories) setLocal(STORAGE_KEYS.logbooks, data.logbookCategories);
      return data;
    }
  } catch (err) {
    console.warn('API unavailable, switching to local storage fallback mode.');
  }

  return {
    personnel: getLocal(STORAGE_KEYS.personnel, initialPersonnel),
    docs: getLocal(STORAGE_KEYS.docs, initialDocs),
    announcements: getLocal(STORAGE_KEYS.announcements, initialAnnouncements),
    reports: getLocal(STORAGE_KEYS.reports, initialReports),
    emergencyContacts: getLocal(STORAGE_KEYS.contacts, initialEmergencyContacts),
    logbookCategories: getLocal(STORAGE_KEYS.logbooks, initialLogbookCategories)
  };
}

export async function savePersonnel(payload) {
  try {
    const res = await fetch('/api/personnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API savePersonnel failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.personnel, initialPersonnel);
  if (payload.id) {
    list = list.map(item => item.id === payload.id ? { ...item, ...payload } : item);
  } else {
    const newId = `u_${Date.now()}`;
    list.push({ ...payload, id: newId });
  }
  setLocal(STORAGE_KEYS.personnel, list);
  return { personnel: list };
}

export async function deletePersonnel(id) {
  try {
    const res = await fetch('/api/personnel', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API deletePersonnel failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.personnel, initialPersonnel);
  list = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.personnel, list);
  return { personnel: list };
}

export async function saveDoc(payload) {
  try {
    const res = await fetch('/api/docs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API saveDoc failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.docs, initialDocs);
  if (payload.id) {
    list = list.map(item => item.id === payload.id ? { ...item, ...payload } : item);
  } else {
    const newId = `doc_${Date.now()}`;
    list.push({ ...payload, id: newId });
  }
  setLocal(STORAGE_KEYS.docs, list);
  return { docs: list };
}

export async function deleteDoc(id) {
  try {
    const res = await fetch('/api/docs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API deleteDoc failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.docs, initialDocs);
  list = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.docs, list);
  return { docs: list };
}

export async function saveAnnouncement(payload) {
  try {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API saveAnnouncement failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.announcements, initialAnnouncements);
  if (payload.id) {
    list = list.map(item => item.id === payload.id ? { ...item, ...payload } : item);
  } else {
    const newId = `ann_${Date.now()}`;
    list.push({ ...payload, id: newId });
  }
  setLocal(STORAGE_KEYS.announcements, list);
  return { announcements: list };
}

export async function deleteAnnouncement(id) {
  try {
    const res = await fetch('/api/announcements', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API deleteAnnouncement failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.announcements, initialAnnouncements);
  list = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.announcements, list);
  return { announcements: list };
}

export async function saveContact(payload) {
  try {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API saveContact failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.contacts, initialEmergencyContacts);
  if (payload.id) {
    list = list.map(item => item.id === payload.id ? { ...item, ...payload } : item);
  } else {
    const newId = `c_${Date.now()}`;
    list.push({ ...payload, id: newId });
  }
  setLocal(STORAGE_KEYS.contacts, list);
  return { emergencyContacts: list };
}

export async function deleteContact(id) {
  try {
    const res = await fetch('/api/contacts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API deleteContact failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.contacts, initialEmergencyContacts);
  list = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.contacts, list);
  return { emergencyContacts: list };
}

export async function saveReport(payload) {
  try {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API saveReport failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.reports, initialReports);
  if (payload.id) {
    list = list.map(item => item.id === payload.id ? { ...item, ...payload } : item);
  } else {
    const newId = `LOG-${Date.now().toString().slice(-4)}`;
    list.push({ ...payload, id: newId });
  }
  setLocal(STORAGE_KEYS.reports, list);
  return { reports: list };
}

export async function deleteReports(payload) {
  try {
    const res = await fetch('/api/reports', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API deleteReports failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.reports, initialReports);
  if (payload.id) {
    list = list.filter(item => item.id !== payload.id);
  } else if (payload.ids && Array.isArray(payload.ids)) {
    list = list.filter(item => !payload.ids.includes(item.id));
  }
  setLocal(STORAGE_KEYS.reports, list);
  return { reports: list };
}

export async function saveLogbookCategory(payload) {
  try {
    const res = await fetch('/api/logbooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API saveLogbookCategory failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.logbooks, initialLogbookCategories);
  if (payload.id) {
    list = list.map(item => item.id === payload.id ? { ...item, ...payload } : item);
  } else {
    const newId = payload.title.toLowerCase().replace(/\s+/g, '_');
    list.push({ ...payload, id: newId });
  }
  setLocal(STORAGE_KEYS.logbooks, list);
  return { logbookCategories: list };
}

export async function deleteLogbookCategory(id) {
  try {
    const res = await fetch('/api/logbooks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API deleteLogbookCategory failed, applying client fallback.');
  }

  let list = getLocal(STORAGE_KEYS.logbooks, initialLogbookCategories);
  list = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.logbooks, list);
  return { logbookCategories: list };
}
