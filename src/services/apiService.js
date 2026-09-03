// API Service for Supabase Integration via Next.js API Routes

export async function fetchPortalData() {
  try {
    const [resData, resPersonnel] = await Promise.all([
      fetch(`/api/data?_t=${Date.now()}`, { cache: 'no-store' }),
      fetch(`/api/personnel?_t=${Date.now()}`, { cache: 'no-store' })
    ]);

    let data = {};
    if (resData.ok) {
      data = await resData.json();
    }

    if (resPersonnel.ok) {
      const pData = await resPersonnel.json();
      if (pData.personnel && pData.personnel.length > 0) {
        data.personnel = pData.personnel;
      }
    }

    return data;
  } catch (err) {
    console.error('API Supabase error on fetchPortalData:', err);
  }

  return {
    personnel: [],
    docs: [],
    announcements: [],
    reports: [],
    emergencyContacts: [],
    logbookCategories: []
  };
}

export async function savePersonnel(payload) {
  try {
    const res = await fetch('/api/personnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API savePersonnel failed:', err);
  }
  return { success: false };
}

export async function deletePersonnel(id) {
  try {
    const res = await fetch('/api/personnel', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API deletePersonnel failed:', err);
  }
  return { success: false };
}

export async function saveDoc(payload) {
  try {
    const res = await fetch('/api/docs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API saveDoc failed:', err);
  }
  return { success: false };
}

export async function deleteDoc(id) {
  try {
    const res = await fetch('/api/docs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API deleteDoc failed:', err);
  }
  return { success: false };
}

export async function saveAnnouncement(payload) {
  try {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API saveAnnouncement failed:', err);
  }
  return { success: false };
}

export async function deleteAnnouncement(id) {
  try {
    const res = await fetch('/api/announcements', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API deleteAnnouncement failed:', err);
  }
  return { success: false };
}

export async function saveContact(payload) {
  try {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API saveContact failed:', err);
  }
  return { success: false };
}

export async function deleteContact(id) {
  try {
    const res = await fetch('/api/contacts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API deleteContact failed:', err);
  }
  return { success: false };
}

export async function saveReport(payload) {
  try {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API saveReport failed:', err);
  }
  return { success: false };
}

export async function deleteReports(payload) {
  try {
    const res = await fetch('/api/reports', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API deleteReports failed:', err);
  }
  return { success: false };
}

export async function saveLogbookCategory(payload) {
  try {
    const res = await fetch('/api/logbooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API saveLogbookCategory failed:', err);
  }
  return { success: false };
}

export async function deleteLogbookCategory(id) {
  try {
    const res = await fetch('/api/logbooks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API deleteLogbookCategory failed:', err);
  }
  return { success: false };
}
