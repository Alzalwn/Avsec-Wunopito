'use client';
import React, { useState, useEffect } from 'react';

import Navbar from './avsec/Navbar.jsx';
import Sidebar from './avsec/Sidebar.jsx';
import NotificationToast from './avsec/NotificationToast.jsx';

import DashboardTab from './avsec/DashboardTab.jsx';
import LogbookTab from './avsec/LogbookTab.jsx';
import DocumentsTab from './avsec/DocumentsTab.jsx';
import InformationTab from './avsec/InformationTab.jsx';
import PersonnelTab from './avsec/PersonnelTab.jsx';
import AdminTab from './avsec/AdminTab.jsx';

import LoginView from './avsec/LoginView.jsx';
import LoginModal from './avsec/modals/LoginModal.jsx';
import FirstLoginModal from './avsec/modals/FirstLoginModal.jsx';
import PersonnelModal from './avsec/modals/PersonnelModal.jsx';
import DocumentModal from './avsec/modals/DocumentModal.jsx';
import AnnouncementModal from './avsec/modals/AnnouncementModal.jsx';
import ContactModal from './avsec/modals/ContactModal.jsx';
import LogbookModal from './avsec/modals/LogbookModal.jsx';
import EditReportModal from './avsec/modals/EditReportModal.jsx';
import ResetPasswordModal from './avsec/modals/ResetPasswordModal.jsx';
import ConfirmDeleteModal from './avsec/modals/ConfirmDeleteModal.jsx';

import {
  initialPersonnel,
  initialDocs,
  initialAnnouncements,
  initialReports,
  initialEmergencyContacts,
  initialLogbookCategories,
  googleSheetsUrl
} from '../utils/helpers.js';

import * as apiService from '../services/apiService.js';

export default function AvsecPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // Auth States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Layout & Navigation States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminSubTab, setAdminSubTab] = useState(null);
  const [announcementSubTab, setAnnouncementSubTab] = useState('pengumuman');

  // Collections Data States
  const [personnelList, setPersonnelList] = useState(initialPersonnel);
  const [docList, setDocList] = useState(initialDocs);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [reportList, setReportList] = useState(initialReports);
  const [emergencyContacts, setEmergencyContacts] = useState(initialEmergencyContacts);
  const [logbookCategories, setLogbookCategories] = useState(initialLogbookCategories);

  // Filters & Sub-states
  const [personnelSearch, setPersonnelSearch] = useState('');
  const [licenseFilter, setLicenseFilter] = useState('Semua');
  const [docSearch, setDocSearch] = useState('');
  const [docCategory, setDocCategory] = useState('Semua Kategori');

  // Logbook Tab States
  const [logbookMainTab, setLogbookMainTab] = useState('form');
  const [selectedFormKey, setSelectedFormKey] = useState('access_control');
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Reports Multi-select & Delete Verification States
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const [isEditReportModalOpen, setIsEditReportModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [reportFormState, setReportFormState] = useState({ tipe: '', lokasi: '', pelapor: '', waktu: '', ringkasan: '', status: 'Selesai' });
  const [isAdminPasswordPromptOpen, setIsAdminPasswordPromptOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [pendingDeleteAction, setPendingDeleteAction] = useState(null);

  // First Login & Security Form States
  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] = useState(false);
  const [firstLoginPassForm, setFirstLoginPassForm] = useState({ newPass: '', confirmPass: '' });
  const [firstLoginError, setFirstLoginError] = useState('');
  const [adminSecurityForm, setAdminSecurityForm] = useState({ newUsername: '', currentPass: '', newPass: '', confirmPass: '' });

  // Entity Modal States & Forms
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);
  const [editingPersonnel, setEditingPersonnel] = useState(null);
  const [personnelForm, setPersonnelForm] = useState({
    nama: '',
    id_pas: '',
    jabatan: '',
    lisensi: 'Basic',
    status_lisensi: 'Aktif',
    masa_berlaku: '',
    kontak: '',
    username: '',
    role: 'USER',
    password_default: 'wunopito123'
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');

  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [docForm, setDocForm] = useState({
    title: '',
    nomor: '',
    kategori: 'Prosedur',
    tanggal: '',
    ukuran: '1.5 MB',
    versi: 'v1.0 / 2026',
    deskripsi: '',
    drive_url: 'https://drive.google.com/file/d/demo/view?usp=sharing'
  });

  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    shift: 'Shift Pagi (06:00 - 14:00 WITA)',
    content: '',
    priority: 'Normal'
  });

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactForm, setContactForm] = useState({ nama: '', kontak: '', status: '24 Jam Aktif' });

  const [isAddLogbookModalOpen, setIsAddLogbookModalOpen] = useState(false);
  const [logbookForm, setLogbookForm] = useState({ title: '', url: '', nativeUrl: '', sheetsUrl: '' });

  // Toast Notification
  const [notification, setNotification] = useState('');
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Initial Fetch from Database API & Session Rehydration
  useEffect(() => {
    const savedUser = localStorage.getItem('avsec_remembered_username');
    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }

    const sessionUser = localStorage.getItem('avsec_current_user');
    if (sessionUser) {
      try {
        setCurrentUser(JSON.parse(sessionUser));
      } catch (e) {
        localStorage.removeItem('avsec_current_user');
      }
    }

    apiService.fetchPortalData()
      .then(data => {
        if (data.personnel) setPersonnelList(data.personnel);
        if (data.docs) setDocList(data.docs);
        if (data.announcements) setAnnouncements(data.announcements);
        if (data.reports) setReportList(data.reports);
        if (data.emergencyContacts) setEmergencyContacts(data.emergencyContacts);
        if (data.logbookCategories) setLogbookCategories(data.logbookCategories);
      })
      .catch(err => console.error('Gagal memuat data dari database:', err));
  }, []);

  const changeTabWithLoading = (tabName) => {
    setActiveTab(tabName);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  // Auth Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      let matchedUser = null;
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        matchedUser = { id: 'u1', username: 'admin', nama_lengkap: 'Admin Wunopito', role: 'ADMIN', is_first_login: false };
      } else if (username.toLowerCase() === 'user' && password === 'user123') {
        matchedUser = { id: 'u2', username: 'user', nama_lengkap: 'Petugas AVSEC Wunopito', role: 'USER', is_first_login: false };
      } else {
        const person = personnelList.find(p => p.username.toLowerCase() === username.toLowerCase() || p.id_pas.toLowerCase() === username.toLowerCase());
        if (person) {
          matchedUser = { id: person.id, username: person.username, nama_lengkap: person.nama, role: person.role || 'USER', is_first_login: person.is_first_login ?? true };
        }
      }

      if (matchedUser) {
        if (rememberMe) {
          localStorage.setItem('avsec_remembered_username', username);
        } else {
          localStorage.removeItem('avsec_remembered_username');
        }

        localStorage.setItem('avsec_current_user', JSON.stringify(matchedUser));
        setCurrentUser(matchedUser);
        setIsLoginModalOpen(false);

        if (matchedUser.is_first_login) {
          setIsFirstLoginModalOpen(true);
        }
        changeTabWithLoading('dashboard');
      } else {
        setLoginError('Kredensial tidak valid. Silakan gunakan ID Pas / Username dan Password Anda.');
      }
      setIsLoggingIn(false);
    }, 450);
  };

  const handleLogout = () => {
    localStorage.removeItem('avsec_current_user');
    setCurrentUser(null);
    setPassword('');
    setActiveTab('dashboard');
  };

  const handleSaveFirstLoginPassword = (e) => {
    e.preventDefault();
    setFirstLoginError('');
    if (firstLoginPassForm.newPass.length < 6) {
      setFirstLoginError('Password baru minimal 6 karakter!');
      return;
    }
    if (firstLoginPassForm.newPass !== firstLoginPassForm.confirmPass) {
      setFirstLoginError('Konfirmasi password tidak cocok!');
      return;
    }

    setCurrentUser({ ...currentUser, is_first_login: false });
    const person = personnelList.find(p => p.username === currentUser.username);
    if (person) {
      apiService.savePersonnel({ ...person, is_first_login: false }).then(d => d.personnel && setPersonnelList(d.personnel));
    }
    setIsFirstLoginModalOpen(false);
    showNotification('Password berhasil diperbarui! Selamat bertugas di Portal AVSEC.');
  };

  const handleSaveAdminSecurity = (e) => {
    e.preventDefault();
    if (adminSecurityForm.newUsername && personnelList.some(p => p.username.toLowerCase() === adminSecurityForm.newUsername.toLowerCase() && p.username !== currentUser.username)) {
      alert('Username tersebut sudah digunakan oleh akun lain!');
      return;
    }

    if (adminSecurityForm.newPass) {
      if (adminSecurityForm.newPass.length < 6) {
        alert('Password baru minimal 6 karakter!');
        return;
      }
      if (adminSecurityForm.newPass !== adminSecurityForm.confirmPass) {
        alert('Konfirmasi password baru tidak cocok!');
        return;
      }
    }

    const updatedName = adminSecurityForm.newUsername || currentUser.username;
    setCurrentUser({ ...currentUser, username: updatedName });
    showNotification('Kredensial berhasil diperbarui.');
    setAdminSecurityForm({ newUsername: '', currentPass: '', newPass: '', confirmPass: '' });
  };

  // CRUD Handlers for Personnel
  const openAddPersonnelModal = () => {
    setEditingPersonnel(null);
    setPersonnelForm({
      nama: '',
      id_pas: `AV-0${Math.floor(10 + Math.random() * 90)}`,
      jabatan: '',
      lisensi: 'Basic',
      status_lisensi: 'Aktif',
      masa_berlaku: new Date(Date.now() + 365 * 2 * 24 * 3600 * 1000).toISOString().split('T')[0],
      kontak: '0812-xxxx-xxxx',
      username: '',
      role: 'USER',
      password_default: 'wunopito123'
    });
    setIsPersonnelModalOpen(true);
  };

  const openEditPersonnelModal = (person) => {
    setEditingPersonnel(person);
    setPersonnelForm({ ...person, role: person.role || 'USER', password_default: person.password_default || 'wunopito123' });
    setIsPersonnelModalOpen(true);
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let res = '';
    for (let i = 0; i < 8; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPersonnelForm({ ...personnelForm, password_default: res });
  };

  const handleSavePersonnel = (e) => {
    e.preventDefault();
    if (!personnelForm.nama || !personnelForm.jabatan) {
      alert('Nama dan Jabatan wajib diisi!');
      return;
    }

    const autoUsername = personnelForm.username || personnelForm.id_pas || personnelForm.nama.toLowerCase().replace(/\s+/g, '_');
    const personPayload = editingPersonnel
      ? { ...editingPersonnel, ...personnelForm, username: autoUsername }
      : { ...personnelForm, username: autoUsername, is_first_login: true };

    apiService.savePersonnel(personPayload)
      .then(data => {
        if (data.personnel) {
          setPersonnelList(data.personnel);
          showNotification(editingPersonnel ? `Data personel ${personnelForm.nama} berhasil diperbarui di database.` : `Personel baru ${personnelForm.nama} berhasil didaftarkan ke database.`);
        }
      })
      .catch(err => console.error('Error saving personnel:', err));

    setIsPersonnelModalOpen(false);
  };

  const handleDeletePersonnel = (id, nama) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data personel: ${nama}?`)) {
      apiService.deletePersonnel(id)
        .then(data => {
          if (data.personnel) {
            setPersonnelList(data.personnel);
            showNotification(`Personel ${nama} telah dihapus dari database.`);
          }
        })
        .catch(err => console.error('Error deleting personnel:', err));
    }
  };

  const openResetPasswordModal = (person) => {
    setResetTargetUser(person);
    setNewPasswordValue('wunopito123');
    setIsPasswordModalOpen(true);
  };

  const handleSaveResetPassword = (e) => {
    e.preventDefault();
    if (!resetTargetUser) return;
    const updated = { ...resetTargetUser, password_default: newPasswordValue, is_first_login: true };
    apiService.savePersonnel(updated)
      .then(data => {
        if (data.personnel) {
          setPersonnelList(data.personnel);
          showNotification(`Password berhasil di-reset menjadi: ${newPasswordValue}`);
        }
      })
      .catch(err => console.error('Error resetting password:', err));
    setIsPasswordModalOpen(false);
  };

  // CRUD Handlers for Emergency Contacts
  const openAddContactModal = () => {
    setEditingContact(null);
    setContactForm({ nama: '', kontak: '', status: '24 Jam Aktif' });
    setIsContactModalOpen(true);
  };

  const openEditContactModal = (item) => {
    setEditingContact(item);
    setContactForm({ ...item });
    setIsContactModalOpen(true);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (!contactForm.nama || !contactForm.kontak) {
      alert('Nama Pos/Unit dan Kontak wajib diisi!');
      return;
    }

    const contactPayload = editingContact ? { ...editingContact, ...contactForm } : { ...contactForm };
    apiService.saveContact(contactPayload)
      .then(data => {
        if (data.emergencyContacts) {
          setEmergencyContacts(data.emergencyContacts);
          showNotification(editingContact ? `Kontak darurat "${contactForm.nama}" diperbarui di database.` : `Kontak darurat baru "${contactForm.nama}" ditambahkan ke database.`);
        }
      })
      .catch(err => console.error('Error saving contact:', err));

    setIsContactModalOpen(false);
  };

  const handleDeleteContact = (id, nama) => {
    if (confirm(`Hapus kontak darurat "${nama}"?`)) {
      apiService.deleteContact(id)
        .then(data => {
          if (data.emergencyContacts) {
            setEmergencyContacts(data.emergencyContacts);
            showNotification(`Kontak darurat "${nama}" dihapus dari database.`);
          }
        })
        .catch(err => console.error('Error deleting contact:', err));
    }
  };

  // CRUD Handlers for Documents
  const openAddDocModal = () => {
    setEditingDoc(null);
    setDocForm({
      title: '',
      nomor: `SOP/AVSEC-WNP/00${docList.length + 1}/2026`,
      kategori: 'Prosedur',
      tanggal: new Date().toISOString().split('T')[0],
      ukuran: '2.0 MB',
      versi: 'v1.0 / 2026',
      deskripsi: '',
      drive_url: 'https://drive.google.com/file/d/demo/view?usp=sharing'
    });
    setIsDocModalOpen(true);
  };

  const openEditDocModal = (doc) => {
    setEditingDoc(doc);
    setDocForm({ ...doc });
    setIsDocModalOpen(true);
  };

  const handleSaveDoc = (e) => {
    e.preventDefault();
    if (!docForm.title || !docForm.nomor) {
      alert('Judul dan Nomor Dokumen wajib diisi!');
      return;
    }

    const docPayload = editingDoc ? { ...editingDoc, ...docForm } : { ...docForm };
    apiService.saveDoc(docPayload)
      .then(data => {
        if (data.docs) {
          setDocList(data.docs);
          showNotification(editingDoc ? `Dokumen "${docForm.title}" berhasil diperbarui di database.` : `Dokumen baru "${docForm.title}" berhasil ditambahkan ke database.`);
        }
      })
      .catch(err => console.error('Error saving document:', err));

    setIsDocModalOpen(false);
  };

  const handleDeleteDoc = (id, title) => {
    if (confirm(`Hapus dokumen "${title}" dari Pusat SOP?`)) {
      apiService.deleteDoc(id)
        .then(data => {
          if (data.docs) {
            setDocList(data.docs);
            showNotification(`Dokumen "${title}" telah dihapus dari database.`);
          }
        })
        .catch(err => console.error('Error deleting document:', err));
    }
  };

  // CRUD Handlers for Announcements
  const openAddAnnouncementModal = () => {
    setEditingAnnouncement(null);
    setAnnouncementForm({
      title: '',
      shift: 'Shift Pagi (06:00 - 14:00 WITA)',
      content: '',
      priority: 'Normal'
    });
    setIsAnnouncementModalOpen(true);
  };

  const openEditAnnouncementModal = (item) => {
    setEditingAnnouncement(item);
    setAnnouncementForm({ ...item });
    setIsAnnouncementModalOpen(true);
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.content) {
      alert('Judul dan Isi pengumuman wajib diisi!');
      return;
    }

    const annPayload = editingAnnouncement ? { ...editingAnnouncement, ...announcementForm } : { ...announcementForm, tanggal: 'Baru saja' };
    apiService.saveAnnouncement(annPayload)
      .then(data => {
        if (data.announcements) {
          setAnnouncements(data.announcements);
          showNotification(editingAnnouncement ? `Pengumuman "${announcementForm.title}" berhasil diperbarui di database.` : `Pengumuman baru "${announcementForm.title}" diterbitkan ke database.`);
        }
      })
      .catch(err => console.error('Error saving announcement:', err));

    setIsAnnouncementModalOpen(false);
  };

  const handleDeleteAnnouncement = (id, title) => {
    if (confirm(`Hapus pengumuman "${title}"?`)) {
      apiService.deleteAnnouncement(id)
        .then(data => {
          if (data.announcements) {
            setAnnouncements(data.announcements);
            showNotification(`Pengumuman "${title}" telah dihapus dari database.`);
          }
        })
        .catch(err => console.error('Error deleting announcement:', err));
    }
  };

  // CRUD Handlers for Logbook Categories
  const handleSaveNewLogbook = (e) => {
    e.preventDefault();
    if (!logbookForm.title.trim() || !logbookForm.url.trim()) return;
    const newCat = {
      title: logbookForm.title.trim().toUpperCase(),
      url: logbookForm.url.trim(),
      nativeUrl: logbookForm.nativeUrl.trim() || logbookForm.url.trim(),
      sheetsUrl: logbookForm.sheetsUrl.trim() || googleSheetsUrl
    };

    apiService.saveLogbookCategory(newCat)
      .then(data => {
        if (data.logbookCategories) {
          setLogbookCategories(data.logbookCategories);
          const added = data.logbookCategories[data.logbookCategories.length - 1];
          if (added) setSelectedFormKey(added.id);
          showNotification(`Jenis Logbook "${newCat.title}" berhasil ditambahkan ke database!`);
        }
      })
      .catch(err => console.error('Error saving logbook category:', err));

    setIsAddLogbookModalOpen(false);
    setLogbookForm({ title: '', url: '', nativeUrl: '', sheetsUrl: '' });
  };

  const handleDeleteLogbookCategory = (catId, catTitle) => {
    if (logbookCategories.length <= 1) {
      alert('Gagal: Minimal harus ada 1 jenis logbook dalam sistem!');
      return;
    }
    if (window.confirm(`Apakah Anda yakin ingin menghapus jenis logbook "${catTitle}" dari menu Pelaporan?`)) {
      apiService.deleteLogbookCategory(catId)
        .then(data => {
          if (data.logbookCategories) {
            setLogbookCategories(data.logbookCategories);
            if (selectedFormKey === catId) {
              setSelectedFormKey(data.logbookCategories[0]?.id || '');
            }
            showNotification(`Jenis Logbook "${catTitle}" berhasil dihapus dari database.`);
          }
        })
        .catch(err => console.error('Error deleting logbook category:', err));
    }
  };

  // Report Log Handlers
  const openEditReportModal = (rpt) => {
    setEditingReport(rpt);
    setReportFormState({
      tipe: rpt.tipe,
      lokasi: rpt.lokasi,
      pelapor: rpt.pelapor,
      waktu: rpt.waktu,
      ringkasan: rpt.ringkasan,
      status: rpt.status
    });
    setIsEditReportModalOpen(true);
  };

  const handleSaveReportEdit = (e) => {
    e.preventDefault();
    if (!editingReport) return;
    const updated = { ...editingReport, ...reportFormState };
    apiService.saveReport(updated)
      .then(data => {
        if (data.reports) {
          setReportList(data.reports);
          showNotification(`Record Log ${editingReport.id} berhasil diperbarui di database.`);
        }
      })
      .catch(err => console.error('Error updating report:', err));

    setIsEditReportModalOpen(false);
  };

  const requestDeleteReport = (id) => {
    setPendingDeleteAction({ type: 'single', id });
    setAdminPasswordInput('');
    setAdminPasswordError('');
    setIsAdminPasswordPromptOpen(true);
  };

  const requestBulkDeleteReports = () => {
    if (selectedReportIds.length === 0) return;
    setPendingDeleteAction({ type: 'bulk' });
    setAdminPasswordInput('');
    setAdminPasswordError('');
    setIsAdminPasswordPromptOpen(true);
  };

  const handleConfirmAdminPasswordForDelete = (e) => {
    e.preventDefault();
    setAdminPasswordError('');

    if (!adminPasswordInput) {
      setAdminPasswordError('Password Admin wajib diisi!');
      return;
    }

    if (adminPasswordInput !== 'admin123' && adminPasswordInput !== password && adminPasswordInput !== 'wunopito123') {
      setAdminPasswordError('Password Admin tidak cocok! Penghapusan dibatalkan.');
      return;
    }

    if (pendingDeleteAction?.type === 'single') {
      const targetId = pendingDeleteAction.id;
      apiService.deleteReports({ id: targetId })
        .then(data => {
          if (data.reports) {
            setReportList(data.reports);
            setSelectedReportIds(selectedReportIds.filter(id => id !== targetId));
            showNotification(`Record Log ${targetId} berhasil dihapus dari database.`);
          }
        })
        .catch(err => console.error('Error deleting report:', err));
    } else if (pendingDeleteAction?.type === 'bulk') {
      const count = selectedReportIds.length;
      apiService.deleteReports({ ids: selectedReportIds })
        .then(data => {
          if (data.reports) {
            setReportList(data.reports);
            setSelectedReportIds([]);
            showNotification(`${count} Record Log berhasil dihapus masal dari database.`);
          }
        })
        .catch(err => console.error('Error bulk deleting reports:', err));
    }

    setIsAdminPasswordPromptOpen(false);
    setPendingDeleteAction(null);
  };

  const toggleSelectAllReports = () => {
    if (selectedReportIds.length === reportList.length && reportList.length > 0) {
      setSelectedReportIds([]);
    } else {
      setSelectedReportIds(reportList.map(r => r.id));
    }
  };

  const toggleSelectReport = (id) => {
    if (selectedReportIds.includes(id)) {
      setSelectedReportIds(selectedReportIds.filter(i => i !== id));
    } else {
      setSelectedReportIds([...selectedReportIds, id]);
    }
  };

  const activeFormObj = logbookCategories.find(c => c.id === selectedFormKey) || logbookCategories[0] || {
    id: 'default',
    title: 'LOGBOOK AVSEC',
    url: '',
    nativeUrl: '',
    sheetsUrl: googleSheetsUrl
  };

  if (!currentUser) {
    return (
      <LoginView
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginError={loginError}
        isLoggingIn={isLoggingIn}
        handleLogin={handleLogin}
        setCurrentUser={setCurrentUser}
        changeTabWithLoading={changeTabWithLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* Toast Notification */}
      <NotificationToast notification={notification} />

      {/* Top Header Navbar */}
      <Navbar
        currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleLogout={handleLogout}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Menu */}
        <Sidebar
          activeTab={activeTab}
          changeTabWithLoading={changeTabWithLoading}
          currentUser={currentUser}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          handleLogout={handleLogout}
          personnelCount={personnelList.length}
          docCount={docList.length}
          announcementCount={announcements.length}
        />

        {/* Dynamic Tab Views */}
        <main className="flex-1 min-w-0">
          {isLoading ? (
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-slate-200/80 animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded-xl w-1/3" />
              <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
              <div className="h-64 bg-slate-50 rounded-2xl border border-slate-100 mt-6" />
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardTab
                  personnelList={personnelList}
                  reportList={reportList}
                  docList={docList}
                  announcements={announcements}
                  emergencyContacts={emergencyContacts}
                  currentUser={currentUser}
                  changeTabWithLoading={changeTabWithLoading}
                  setLogbookMainTab={setLogbookMainTab}
                  setSelectedFormKey={setSelectedFormKey}
                  setIsIframeLoading={setIsIframeLoading}
                  setAdminSubTab={setAdminSubTab}
                  setAnnouncementSubTab={setAnnouncementSubTab}
                />
              )}

              {activeTab === 'logbook' && (
                <LogbookTab
                  logbookMainTab={logbookMainTab}
                  setLogbookMainTab={setLogbookMainTab}
                  logbookCategories={logbookCategories}
                  selectedFormKey={selectedFormKey}
                  setSelectedFormKey={setSelectedFormKey}
                  isIframeLoading={isIframeLoading}
                  setIsIframeLoading={setIsIframeLoading}
                  activeFormObj={activeFormObj}
                  currentUser={currentUser}
                  selectedReportIds={selectedReportIds}
                  requestBulkDeleteReports={requestBulkDeleteReports}
                  reportList={reportList}
                  toggleSelectAllReports={toggleSelectAllReports}
                  toggleSelectReport={toggleSelectReport}
                  openEditReportModal={openEditReportModal}
                  requestDeleteReport={requestDeleteReport}
                />
              )}

              {activeTab === 'dokumen' && (
                <DocumentsTab
                  docList={docList}
                  docSearch={docSearch}
                  setDocSearch={setDocSearch}
                  docCategory={docCategory}
                  setDocCategory={setDocCategory}
                  currentUser={currentUser}
                  changeTabWithLoading={changeTabWithLoading}
                  setAdminSubTab={setAdminSubTab}
                  openAddDocModal={openAddDocModal}
                  openEditDocModal={openEditDocModal}
                />
              )}

              {activeTab === 'informasi' && (
                <InformationTab
                  announcements={announcements}
                  emergencyContacts={emergencyContacts}
                  currentUser={currentUser}
                  changeTabWithLoading={changeTabWithLoading}
                  setAdminSubTab={setAdminSubTab}
                  openAddAnnouncementModal={openAddAnnouncementModal}
                  openEditAnnouncementModal={openEditAnnouncementModal}
                  handleDeleteAnnouncement={handleDeleteAnnouncement}
                  openAddContactModal={openAddContactModal}
                  openEditContactModal={openEditContactModal}
                  handleDeleteContact={handleDeleteContact}
                />
              )}

              {activeTab === 'personnel' && (
                <PersonnelTab
                  personnelList={personnelList}
                  personnelSearch={personnelSearch}
                  setPersonnelSearch={setPersonnelSearch}
                  licenseFilter={licenseFilter}
                  setLicenseFilter={setLicenseFilter}
                  currentUser={currentUser}
                  changeTabWithLoading={changeTabWithLoading}
                  setAdminSubTab={setAdminSubTab}
                  openAddPersonnelModal={openAddPersonnelModal}
                  openEditPersonnelModal={openEditPersonnelModal}
                  showNotification={showNotification}
                />
              )}

              {activeTab === 'admin' && currentUser?.role === 'ADMIN' && (
                <AdminTab
                  personnelList={personnelList}
                  docList={docList}
                  announcements={announcements}
                  emergencyContacts={emergencyContacts}
                  logbookCategories={logbookCategories}
                  adminSubTab={adminSubTab}
                  setAdminSubTab={setAdminSubTab}
                  announcementSubTab={announcementSubTab}
                  setAnnouncementSubTab={setAnnouncementSubTab}
                  openAddPersonnelModal={openAddPersonnelModal}
                  openResetPasswordModal={openResetPasswordModal}
                  openEditPersonnelModal={openEditPersonnelModal}
                  handleDeletePersonnel={handleDeletePersonnel}
                  openAddAnnouncementModal={openAddAnnouncementModal}
                  openEditAnnouncementModal={openEditAnnouncementModal}
                  handleDeleteAnnouncement={handleDeleteAnnouncement}
                  openAddContactModal={openAddContactModal}
                  openEditContactModal={openEditContactModal}
                  handleDeleteContact={handleDeleteContact}
                  openAddDocModal={openAddDocModal}
                  openEditDocModal={openEditDocModal}
                  handleDeleteDoc={handleDeleteDoc}
                  currentUser={currentUser}
                  adminSecurityForm={adminSecurityForm}
                  setAdminSecurityForm={setAdminSecurityForm}
                  handleSaveAdminSecurity={handleSaveAdminSecurity}
                  setIsAddLogbookModalOpen={setIsAddLogbookModalOpen}
                  handleDeleteLogbookCategory={handleDeleteLogbookCategory}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals Layer */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginError={loginError}
        isLoggingIn={isLoggingIn}
        handleLogin={handleLogin}
      />

      <FirstLoginModal
        isOpen={isFirstLoginModalOpen}
        firstLoginPassForm={firstLoginPassForm}
        setFirstLoginPassForm={setFirstLoginPassForm}
        firstLoginError={firstLoginError}
        handleSaveFirstLoginPassword={handleSaveFirstLoginPassword}
      />

      <PersonnelModal
        isOpen={isPersonnelModalOpen}
        onClose={() => setIsPersonnelModalOpen(false)}
        editingPersonnel={editingPersonnel}
        personnelForm={personnelForm}
        setPersonnelForm={setPersonnelForm}
        generateRandomPassword={generateRandomPassword}
        handleSavePersonnel={handleSavePersonnel}
      />

      <DocumentModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        editingDoc={editingDoc}
        docForm={docForm}
        setDocForm={setDocForm}
        handleSaveDoc={handleSaveDoc}
      />

      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        editingAnnouncement={editingAnnouncement}
        announcementForm={announcementForm}
        setAnnouncementForm={setAnnouncementForm}
        handleSaveAnnouncement={handleSaveAnnouncement}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        editingContact={editingContact}
        contactForm={contactForm}
        setContactForm={setContactForm}
        handleSaveContact={handleSaveContact}
      />

      <LogbookModal
        isOpen={isAddLogbookModalOpen}
        onClose={() => setIsAddLogbookModalOpen(false)}
        logbookForm={logbookForm}
        setLogbookForm={setLogbookForm}
        handleSaveNewLogbook={handleSaveNewLogbook}
      />

      <EditReportModal
        isOpen={isEditReportModalOpen}
        onClose={() => setIsEditReportModalOpen(false)}
        editingReport={editingReport}
        reportFormState={reportFormState}
        setReportFormState={setReportFormState}
        handleSaveReportEdit={handleSaveReportEdit}
      />

      <ResetPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        resetTargetUser={resetTargetUser}
        newPasswordValue={newPasswordValue}
        setNewPasswordValue={setNewPasswordValue}
        handleSaveResetPassword={handleSaveResetPassword}
      />

      <ConfirmDeleteModal
        isOpen={isAdminPasswordPromptOpen}
        onClose={() => { setIsAdminPasswordPromptOpen(false); setPendingDeleteAction(null); }}
        pendingDeleteAction={pendingDeleteAction}
        selectedReportIds={selectedReportIds}
        adminPasswordInput={adminPasswordInput}
        setAdminPasswordInput={setAdminPasswordInput}
        adminPasswordError={adminPasswordError}
        handleConfirmAdminPasswordForDelete={handleConfirmAdminPasswordForDelete}
      />

    </div>
  );
}