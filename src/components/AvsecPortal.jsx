import React, { useState, useEffect } from 'react';
import {
  Lock,
  UserCircle,
  LayoutDashboard,
  FileText,
  BookOpen,
  Users,
  Settings,
  LogOut,
  AlertTriangle,
  Search,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Menu,
  X,
  Eye,
  EyeOff,
  PlusCircle,
  ShieldCheck,
  Radio,
  FileCheck,
  Send,
  ChevronRight,
  Edit3,
  Trash2,
  KeyRound,
  Plus,
  Save,
  Megaphone,
  ExternalLink,
  Printer,
  RefreshCw,
  Phone,
  Shield,
  Key,
  AlertCircle,
  Check
} from 'lucide-react';

import logo from '../assets/logo.jpeg';

const initialPersonnel = [
  { id: '1', nama: 'Budi Santoso', id_pas: 'AV-001', jabatan: 'Komandan Regu', lisensi: 'Senior', status_lisensi: 'Aktif', masa_berlaku: '2027-10-12', kontak: '0812-3456-7890', username: 'AV-001', role: 'ADMIN', is_first_login: false },
  { id: '2', nama: 'Siti Aminah', id_pas: 'AV-042', jabatan: 'Operator X-Ray', lisensi: 'Junior', status_lisensi: 'Mendekati Expired', masa_berlaku: '2026-09-15', kontak: '0813-9876-5432', username: 'AV-042', role: 'USER', is_first_login: false },
  { id: '3', nama: 'Ahmad Dahlan', id_pas: 'AV-088', jabatan: 'Petugas Patroli', lisensi: 'Basic', status_lisensi: 'Kedaluwarsa', masa_berlaku: '2026-01-20', kontak: '0852-1122-3344', username: 'AV-088', role: 'USER', is_first_login: true },
  { id: '4', nama: 'Diana Putri', id_pas: 'AV-015', jabatan: 'Supervisor', lisensi: 'Senior', status_lisensi: 'Aktif', masa_berlaku: '2028-05-01', kontak: '0821-5566-7788', username: 'AV-015', role: 'ADMIN', is_first_login: false },
  { id: '5', nama: 'Yohanes Lera', id_pas: 'AV-023', jabatan: 'Petugas Screening SCP 1', lisensi: 'Junior', status_lisensi: 'Aktif', masa_berlaku: '2027-04-18', kontak: '0813-4455-6677', username: 'AV-023', role: 'USER', is_first_login: false },
  { id: '6', nama: 'Maria Magdalena', id_pas: 'AV-031', jabatan: 'Operator CCTV & Access Control', lisensi: 'Non Lisensi', status_lisensi: 'Aktif', masa_berlaku: '2027-11-30', kontak: '0857-8899-0011', username: 'AV-031', role: 'USER', is_first_login: false }
];

const initialDocs = [
  { id: '1', title: 'SOP Pemeriksaan Penumpang & Barang Bawaan (SCP 1 & 2)', kategori: 'Prosedur', tanggal: '2025-11-10', ukuran: '2.4 MB', nomor: 'SOP/AVSEC-WNP/001/2025', versi: 'v2.1 / 2025', deskripsi: 'Pedoman standar operasional pemeriksaan fisik dan mesin X-Ray di titik SCP 1 & 2.', drive_url: 'https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view?usp=sharing' },
  { id: '2', title: 'KP 167 Tahun 2023 - Program Keamanan Penerbangan Nasional', kategori: 'Regulasi Dirjen', tanggal: '2023-08-22', ukuran: '5.1 MB', nomor: 'KP 167/2023', versi: '2023', deskripsi: 'Peraturan Direktur Jenderal Perhubungan Udara mengenai standar keamanan nasional.', drive_url: 'https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J1K/view?usp=sharing' },
  { id: '3', title: 'PM 80 Tahun 2017 - Program Keamanan Penerbangan Nasional', kategori: 'Regulasi Dirjen', tanggal: '2017-09-15', ukuran: '4.2 MB', nomor: 'PM 80/2017', versi: '2017', deskripsi: 'Peraturan Menteri Perhubungan tentang pedoman teknis keamanan penerbangan sipil.', drive_url: 'https://drive.google.com/file/d/3C4D5E6F7G8H9I0J1K2L/view?usp=sharing' },
  { id: '4', title: 'Instruksi Kerja Pengoperasian & Kalibrasi Mesin X-Ray Dual View', kategori: 'Instruksi Kerja', tanggal: '2026-02-15', ukuran: '1.2 MB', nomor: 'IK/AVSEC/XR-04', versi: 'v1.0 / 2026', deskripsi: 'Petunjuk langkah kalibrasi Combined Test Piece (CTP) pada unit X-Ray.', drive_url: 'https://drive.google.com/file/d/4D5E6F7G8H9I0J1K2L3M/view?usp=sharing' },
  { id: '5', title: 'Prosedur Penanganan Barang Dilarang (Prohibited Items & Dangerous Goods)', kategori: 'Prosedur', tanggal: '2025-12-01', ukuran: '3.0 MB', nomor: 'SOP/AVSEC-WNP/007/2025', versi: 'v3.0 / 2025', deskripsi: 'Tata cara penyitaan, pencatatan, dan pemusnahan barang berbahaya penumpang.', drive_url: 'https://drive.google.com/file/d/5E6F7G8H9I0J1K2L3M4N/view?usp=sharing' },
  { id: '6', title: 'Prosedur Tanggap Darurat Keamanan Penerbangan (Airport Emergency Plan)', kategori: 'Prosedur', tanggal: '2025-09-14', ukuran: '4.8 MB', nomor: 'AEP/WNP/REV-03', versi: 'Rev-03 / 2025', deskripsi: 'Prosedur evakuasi, pengamanan ancaman bom, dan koordinasi komando darurat.', drive_url: 'https://drive.google.com/file/d/6F7G8H9I0J1K2L3M4N5O/view?usp=sharing' },
  { id: '7', title: 'Persyaratan Kualifikasi & Sertifikasi Lisensi Personel (SKP AVSEC)', kategori: 'SKP/Lisensi Personel', tanggal: '2026-01-05', ukuran: '1.8 MB', nomor: 'SKP/AVSEC-REG/012', versi: '2026', deskripsi: 'Matriks jenjang lisensi Basic, Junior, dan Senior Personel Keamanan Penerbangan.', drive_url: 'https://drive.google.com/file/d/7G8H9I0J1K2L3M4N5O6P/view?usp=sharing' }
];

const initialAnnouncements = [
  { id: '1', title: 'Kalibrasi Rutin Mesin X-Ray', shift: 'Shift Pagi (06:00 - 14:00 WITA)', content: 'Pastikan kalibrasi rutin X-Ray SCP 1 & 2 telah diuji dengan Combined Test Piece (CTP) sebelum flight pertama.', priority: 'Penting', tanggal: 'Hari ini' },
  { id: '2', title: 'Patroli Sisi Udara & Runway', shift: 'Perimeter Security', content: 'Tingkatkan intensitas patroli pagar perimeter sisi runway 07 & 25 antisipasi potensi gangguan hewan ternak.', priority: 'Normal', tanggal: 'Hari ini' },
  { id: '3', title: 'Rapat Koordinasi Keamanan Bandara', shift: 'Semua Personel', content: 'Rapat koordinasi bulanan komite keamanan bandara bersama stakeholder terkait dijadwalkan Jumat jam 09:00 WITA.', priority: 'Normal', tanggal: 'Kemarin' }
];

const initialReports = [
  { id: 'RPT-101', tipe: 'Log Patroli Harian', lokasi: 'Perimeter Sisi Udara (Pagar Selatan)', waktu: '08:30 WITA', pelapor: 'Ahmad Dahlan', status: 'Selesai', ringkasan: 'Kondisi pagar perimeter aman, tidak ditemukan celah atau kerusakan.' },
  { id: 'RPT-102', tipe: 'Pemeriksaan Kendaraan', lokasi: 'Main Gate Access Airside', waktu: '10:15 WITA', pelapor: 'Yohanes Lera', status: 'Selesai', ringkasan: 'Pemeriksaan 1 unit truk catering, izin PAS dan bagasi terverifikasi lengkap.' },
  { id: 'RPT-103', tipe: 'Penemuan Barang Terlarang', lokasi: 'SCP 2 (Screening Penumpang)', waktu: '11:45 WITA', pelapor: 'Siti Aminah', status: 'Ditangani', ringkasan: 'Penyitaan 1 buah powerbank over-capacity (30.000 mAh non-standar), diserahkan ke customer care.' }
];

const initialEmergencyContacts = [
  { id: '1', nama: 'Pos Komando AVSEC', kontak: 'Ext. 101', status: '24 Jam Aktif' },
  { id: '2', nama: 'Airport Security Executive', kontak: 'Ext. 102', status: '24 Jam Aktif' },
  { id: '3', nama: 'Tower ATC Wunopito', kontak: 'Freq 122.4 MHz', status: 'Jam Operasional Bandara' },
  { id: '4', nama: 'Polsek Kawasan Bandara', kontak: '0811-3800-991', status: '24 Jam Aktif' }
];

const googleForms = {
  access_control: {
    title: 'LOGBOOK ACCESS CONTROL',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?embedded=true',
    nativeUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?usp=header'
  },
  penyisiran: {
    title: 'LOGBOOK PENYISIRAN AVSEC',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?embedded=true',
    nativeUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?usp=header'
  },
  patroli: {
    title: 'LOGBOOK PATROLI AVSEC',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdFtY1dkwHyBApwj_rlcUw938139yE9trbaZiY0nJwdCFfO_g/viewform?embedded=true',
    nativeUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdFtY1dkwHyBApwj_rlcUw938139yE9trbaZiY0nJwdCFfO_g/viewform?usp=header'
  }
};

const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing';

export default function AvsecPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for Personnel & Filter
  const [personnelList, setPersonnelList] = useState(initialPersonnel);
  const [personnelSearch, setPersonnelSearch] = useState('');
  const [licenseFilter, setLicenseFilter] = useState('Semua');

  // State for Documents & Filter
  const [docList, setDocList] = useState(initialDocs);
  const [docSearch, setDocSearch] = useState('');
  const [docCategory, setDocCategory] = useState('Semua Kategori');

  // State for Announcements & Emergency Contacts
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [emergencyContacts, setEmergencyContacts] = useState(initialEmergencyContacts);
  const [announcementSubTab, setAnnouncementSubTab] = useState('pengumuman'); // 'pengumuman' | 'kontak'

  // State for Reports & Google Form/Sheets Tabs
  const [reportList, setReportList] = useState(initialReports);
  const [reportType, setReportType] = useState('Log Patroli Harian');
  const [reportLocation, setReportLocation] = useState('');
  const [reportSummary, setReportSummary] = useState('');
  const [reportUrgency, setReportUrgency] = useState('Normal');
  const [reportSuccessMsg, setReportSuccessMsg] = useState('');
  const [logbookMainTab, setLogbookMainTab] = useState('form'); // 'form' | 'rekap'
  const [selectedFormKey, setSelectedFormKey] = useState('access_control');
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Admin SubTab State (Default tertutup/null)
  const [adminSubTab, setAdminSubTab] = useState(null);

  // First-Time Login Modal State
  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] = useState(false);
  const [firstLoginPassForm, setFirstLoginPassForm] = useState({ newPass: '', confirmPass: '' });
  const [firstLoginError, setFirstLoginError] = useState('');

  // Admin Security / Profile Form
  const [adminSecurityForm, setAdminSecurityForm] = useState({ newUsername: '', currentPass: '', newPass: '', confirmPass: '' });

  // Emergency Contact Form Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactForm, setContactForm] = useState({ nama: '', kontak: '', status: '24 Jam Aktif' });

  // Personnel Modal Form
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

  // Password Reset Modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');

  // Document Modal Form
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

  // Announcement Modal Form
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    shift: 'Shift Pagi (06:00 - 14:00 WITA)',
    content: '',
    priority: 'Normal'
  });

  // Notification Toast
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Load Saved Username on Initial Mount
  useEffect(() => {
    const savedUser = localStorage.getItem('avsec_remembered_username');
    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }
  }, []);

  // Simulate loading on Tab Navigation
  const changeTabWithLoading = (tabName) => {
    setActiveTab(tabName);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  // Calculate Password Strength Helper
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: 'Kosong', color: 'text-slate-400', width: 'w-0', bg: 'bg-slate-300' };
    if (pass.length < 6) return { label: 'Lemah', color: 'text-red-500', width: 'w-1/3', bg: 'bg-red-500' };
    if (pass.length < 10 || !/\d/.test(pass) || !/[a-zA-Z]/.test(pass)) {
      return { label: 'Sedang', color: 'text-amber-500', width: 'w-2/3', bg: 'bg-amber-500' };
    }
    return { label: 'Kuat', color: 'text-emerald-500', width: 'w-full', bg: 'bg-emerald-500' };
  };

  // ---------------- AUTH HANDLERS ----------------
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      let matchedUser = null;

      // Default hardcoded admin / user for easy testing
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        matchedUser = { id: 'u1', username: 'admin', nama_lengkap: 'Admin Wunopito', role: 'ADMIN', is_first_login: false };
      } else if (username.toLowerCase() === 'user' && password === 'user123') {
        matchedUser = { id: 'u2', username: 'user', nama_lengkap: 'Petugas AVSEC Wunopito', role: 'USER', is_first_login: false };
      } else {
        // Find in personnel list by username or id_pas
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

        setCurrentUser(matchedUser);

        // Check First-Time Login
        if (matchedUser.is_first_login) {
          setIsFirstLoginModalOpen(true);
        }

        changeTabWithLoading('dashboard');
      } else {
        setLoginError('Kredensial tidak valid. Silakan gunakan ID Pas / Username dan Password Anda.');
      }
      setIsLoggingIn(false);
    }, 500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPassword('');
    setActiveTab('dashboard');
  };

  // Handler for First Time Login Password Change
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

    // Update state & flag
    setCurrentUser({ ...currentUser, is_first_login: false });
    setPersonnelList(personnelList.map(p => p.username === currentUser.username ? { ...p, is_first_login: false } : p));
    setIsFirstLoginModalOpen(false);
    showNotification('Password berhasil diperbarui! Selamat bertugas di Portal AVSEC.');
  };

  // ---------------- ADMIN SECURITY PROFILE HANDLER ----------------
  const handleSaveAdminSecurity = (e) => {
    e.preventDefault();
    if (adminSecurityForm.newUsername && personnelList.some(p => p.username.toLowerCase() === adminSecurityForm.newUsername.toLowerCase() && p.username !== currentUser.username)) {
      alert('Username tersebut sudah digunakan oleh akun lain! Gunakan ID Pas / Username unik.');
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
    showNotification('Kredensial berhasil diperbarui. Silakan gunakan Username/Password baru saat login berikutnya.');
    setAdminSecurityForm({ newUsername: '', currentPass: '', newPass: '', confirmPass: '' });
  };

  // ---------------- REPORT HANDLER ----------------
  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!reportLocation || !reportSummary) {
      alert('Silakan lengkapi lokasi dan keterangan laporan.');
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';
    const newReport = {
      id: `RPT-${Math.floor(100 + Math.random() * 900)}`,
      tipe: reportType,
      lokasi: reportLocation,
      waktu: timeString,
      pelapor: currentUser?.nama_lengkap || 'Petugas On Duty',
      status: reportUrgency === 'Tinggi (Darurat)' ? 'Perlu Tindakan' : 'Selesai',
      ringkasan: reportSummary
    };

    setReportList([newReport, ...reportList]);
    setReportLocation('');
    setReportSummary('');
    setReportSuccessMsg(`Laporan #${newReport.id} berhasil dikirim ke Pusat Komando AVSEC.`);
    setTimeout(() => setReportSuccessMsg(''), 5000);
  };

  // ---------------- ADMIN: PERSONNEL CRUD ----------------
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
    setPersonnelForm({
      ...person,
      role: person.role || 'USER',
      password_default: person.password_default || 'wunopito123'
    });
    setIsPersonnelModalOpen(true);
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let res = '';
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPersonnelForm({ ...personnelForm, password_default: res });
  };

  const handleSavePersonnel = (e) => {
    e.preventDefault();
    if (!personnelForm.nama || !personnelForm.jabatan) {
      alert('Nama dan Jabatan wajib diisi!');
      return;
    }

    const autoUsername = personnelForm.username || personnelForm.id_pas || personnelForm.nama.toLowerCase().replace(/\s+/g, '_');

    if (editingPersonnel) {
      setPersonnelList(personnelList.map(p => p.id === editingPersonnel.id ? { ...p, ...personnelForm, username: autoUsername } : p));
      showNotification(`Data personel ${personnelForm.nama} berhasil diperbarui.`);
    } else {
      const newPerson = {
        id: String(Date.now()),
        ...personnelForm,
        username: autoUsername,
        is_first_login: true
      };
      setPersonnelList([...personnelList, newPerson]);
      showNotification(`Personel baru ${newPerson.nama} berhasil didaftarkan (Username: ${autoUsername}).`);
    }
    setIsPersonnelModalOpen(false);
  };

  const handleDeletePersonnel = (id, nama) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data personel: ${nama}?`)) {
      setPersonnelList(personnelList.filter(p => p.id !== id));
      showNotification(`Personel ${nama} telah dihapus dari sistem.`);
    }
  };

  const openResetPasswordModal = (person) => {
    setResetTargetUser(person);
    setNewPasswordValue('wunopito123');
    setIsPasswordModalOpen(true);
  };

  const handleSaveResetPassword = (e) => {
    e.preventDefault();
    setPersonnelList(personnelList.map(p => p.id === resetTargetUser.id ? { ...p, password_default: newPasswordValue, is_first_login: true } : p));
    showNotification(`Password berhasil di-reset menjadi: ${newPasswordValue}`);
    setIsPasswordModalOpen(false);
  };

  // ---------------- ADMIN: EMERGENCY CONTACTS CRUD ----------------
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

    if (editingContact) {
      setEmergencyContacts(emergencyContacts.map(c => c.id === editingContact.id ? { ...c, ...contactForm } : c));
      showNotification(`Kontak darurat "${contactForm.nama}" diperbarui.`);
    } else {
      const newC = { id: String(Date.now()), ...contactForm };
      setEmergencyContacts([...emergencyContacts, newC]);
      showNotification(`Kontak darurat baru "${newC.nama}" ditambahkan.`);
    }
    setIsContactModalOpen(false);
  };

  const handleDeleteContact = (id, nama) => {
    if (confirm(`Hapus kontak darurat "${nama}"?`)) {
      setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
      showNotification(`Kontak darurat "${nama}" dihapus.`);
    }
  };

  // ---------------- ADMIN: DOCUMENT CRUD ----------------
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

    if (editingDoc) {
      setDocList(docList.map(d => d.id === editingDoc.id ? { ...d, ...docForm } : d));
      showNotification(`Dokumen "${docForm.title}" berhasil diperbarui.`);
    } else {
      const newDoc = {
        id: String(Date.now()),
        ...docForm
      };
      setDocList([newDoc, ...docList]);
      showNotification(`Dokumen baru "${newDoc.title}" berhasil ditambahkan.`);
    }
    setIsDocModalOpen(false);
  };

  const handleDeleteDoc = (id, title) => {
    if (confirm(`Hapus dokumen "${title}" dari Pusat SOP?`)) {
      setDocList(docList.filter(d => d.id !== id));
      showNotification(`Dokumen "${title}" telah dihapus.`);
    }
  };

  // ---------------- ADMIN: ANNOUNCEMENT CRUD ----------------
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

    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? { ...a, ...announcementForm } : a));
      showNotification(`Pengumuman "${announcementForm.title}" berhasil diperbarui.`);
    } else {
      const newAnn = {
        id: String(Date.now()),
        ...announcementForm,
        tanggal: 'Baru saja'
      };
      setAnnouncements([newAnn, ...announcements]);
      showNotification(`Pengumuman baru "${newAnn.title}" diterbitkan.`);
    }
    setIsAnnouncementModalOpen(false);
  };

  const handleDeleteAnnouncement = (id, title) => {
    if (confirm(`Hapus pengumuman "${title}"?`)) {
      setAnnouncements(announcements.filter(a => a.id !== id));
      showNotification(`Pengumuman "${title}" telah dihapus.`);
    }
  };

  // ---------------- FILTERED LISTS ----------------
  const filteredPersonnel = personnelList.filter(p => {
    const matchesSearch = p.nama.toLowerCase().includes(personnelSearch.toLowerCase()) || p.id_pas.toLowerCase().includes(personnelSearch.toLowerCase()) || p.jabatan.toLowerCase().includes(personnelSearch.toLowerCase());
    const matchesFilter = licenseFilter === 'Semua' || p.status_lisensi === licenseFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredDocs = docList.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(docSearch.toLowerCase()) || d.nomor.toLowerCase().includes(docSearch.toLowerCase());
    const matchesCat = docCategory === 'Semua Kategori' || d.kategori === docCategory;
    return matchesSearch && matchesCat;
  });

  const navItemClass = (tabName) => `
    flex items-center w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm cursor-pointer
    ${activeTab === tabName
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
  `;

  // ---------------- VIEW: LOGIN ----------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20" />
          <div className="absolute top-40 -left-40 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-15" />
        </div>

        <div className="w-full max-w-4xl flex flex-col md:flex-row bg-slate-900 rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-800">
          <div className="md:w-5/12 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-8 md:p-10 flex flex-col justify-between text-white border-b md:border-b-0 md:border-r border-slate-800">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img src={logo.src || logo} alt="Logo Aviation Security Wunopito" className="w-20 h-20 rounded-xl object-contain bg-white/5 p-1 border border-white/10 shadow-lg" />
                <div>
                  <h1 className="text-xl font-bold tracking-wide">AVSEC WUNOPITO</h1>
                  <p className="text-xs text-blue-400 font-semibold tracking-wider uppercase">Bandara Wunopito - Lembata</p>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 leading-tight text-white">Portal Operasional Keamanan</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Sistem informasi terpusat untuk log pelaporan patroli harian, dokumen regulasi keselamatan, dan data sertifikasi personel AVSEC.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Akses Terbatas</h4>
                  <p className="text-xs text-slate-300 mt-1">Sistem ini hanya diperuntukkan bagi personel keamanan berwenang Bandara Wunopito.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-7/12 p-8 md:p-10 bg-slate-900 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">Masuk ke Portal</h3>
                <p className="text-slate-400 text-sm mt-1">Masukkan ID Pas atau Username Anda untuk bertugas.</p>
              </div>

              {loginError && (
                <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{loginError}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Username / ID Pas</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <UserCircle className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      placeholder="Contoh: admin atau user"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                    />
                    <span>Ingat Saya (Remember Me)</span>
                  </label>

                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Untuk bantuan akses, hubungi Komandan Regu / Unit IT.'); }} className="text-blue-400 hover:underline">
                    Lupa Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full mt-4 flex justify-center items-center py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" /> Memverifikasi...
                    </span>
                  ) : 'Login ke Portal Operasional'}
                </button>
              </form>

              {/* DEMO CREDENTIALS NOTICE & WARNING */}
              <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-start gap-2 text-amber-400 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight">
                    <b className="font-bold">Kredensial Uji Coba (Demo):</b> Wajib dihapus/dinonaktifkan jika sistem ini dipakai resmi di lingkungan internal (production) demi menjaga keamanan data.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold block">ADMIN:</span>
                    <span>admin / admin123</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-blue-400 font-bold block">PETUGAS:</span>
                    <span>user / user123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- VIEW: PORTAL DASHBOARD ----------------
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800">

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Mobile Top Header */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <img src={logo.src || logo} alt="Logo AVSEC" className="w-9 h-9 rounded-lg object-contain bg-white/10 p-0.5" />
          <div>
            <h1 className="text-sm font-bold leading-tight">AVSEC WUNOPITO</h1>
            <p className="text-[10px] text-blue-400 uppercase font-semibold">{currentUser.role} AREA</p>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 h-full w-64 bg-slate-900 text-white flex flex-col z-40 shadow-2xl md:shadow-none
      `}>
        <div className="p-6 border-b border-slate-800 hidden md:flex items-center gap-3">
          <img src={logo.src || logo} alt="Logo AVSEC" className="w-12 h-12 rounded-xl object-contain bg-white/10 p-1 border border-white/10 shadow-sm" />
          <div>
            <h2 className="text-base font-bold leading-snug">AVSEC WUNOPITO</h2>
            <p className="text-[11px] text-blue-400 font-semibold tracking-wider">PORTAL OPERASIONAL</p>
          </div>
        </div>

        <div className="p-5 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <UserCircle className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-white">{currentUser.nama_lengkap}</p>
              <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${currentUser.role === 'ADMIN'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button onClick={() => { changeTabWithLoading('dashboard'); setIsMobileMenuOpen(false); }} className={navItemClass('dashboard')}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button onClick={() => { changeTabWithLoading('reports'); setIsMobileMenuOpen(false); }} className={navItemClass('reports')}>
            <FileText className="w-5 h-5 mr-3" /> Pelaporan & Log
          </button>
          <button onClick={() => { changeTabWithLoading('documents'); setIsMobileMenuOpen(false); }} className={navItemClass('documents')}>
            <BookOpen className="w-5 h-5 mr-3" /> Pusat SOP & Regulasi
          </button>
          <button onClick={() => { changeTabWithLoading('personnel'); setIsMobileMenuOpen(false); }} className={navItemClass('personnel')}>
            <Users className="w-5 h-5 mr-3" /> Data Personel
          </button>

          {currentUser.role === 'ADMIN' && (
            <>
              <div className="pt-4 pb-2 px-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Area Administrator</p>
              </div>
              <button onClick={() => { changeTabWithLoading('admin'); setIsMobileMenuOpen(false); }} className={navItemClass('admin')}>
                <Settings className="w-5 h-5 mr-3 text-red-400" /> Admin Control Panel
              </button>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full transition-opacity duration-300">

        {/* ================= SKELETON SCREEN LOADER ================= */}
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-10 w-64 bg-slate-200 rounded-xl skeleton" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-2 flex-1 pr-4">
                    <div className="h-3 w-20 bg-slate-200 rounded skeleton" />
                    <div className="h-7 w-12 bg-slate-200 rounded-lg skeleton" />
                  </div>
                  <div className="w-12 h-12 bg-slate-200 rounded-xl skeleton" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="h-6 w-48 bg-slate-200 rounded-lg skeleton" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="h-24 bg-slate-100 rounded-2xl skeleton" />
                  ))}
                </div>
                <div className="h-40 bg-slate-100 rounded-xl skeleton" />
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 h-80 skeleton" />
            </div>
          </div>
        ) : (
          <>
            {/* ================= TAB 1: DASHBOARD ================= */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard Operasional</h1>
                    <p className="text-slate-500 text-sm mt-1">Bandara Wunopito (LWE / WATW) - Unit Aviation Security</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>STATUS OPERASIONAL: NORMAL / KONDUSIF</span>
                  </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Personel</p>
                      <div className="flex items-baseline mt-1.5">
                        <p className="text-2xl font-black text-slate-900">{personnelList.length}</p>
                        <span className="text-xs font-medium text-slate-500 ml-1.5">Terdaftar</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Laporan Hari Ini</p>
                      <div className="flex items-baseline mt-1.5">
                        <p className="text-2xl font-black text-slate-900">{reportList.length}</p>
                        <span className="text-xs font-medium text-slate-500 ml-1.5">Log Masuk</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">SOP & Regulasi</p>
                      <div className="flex items-baseline mt-1.5">
                        <p className="text-2xl font-black text-slate-900">{docList.length}</p>
                        <span className="text-xs font-medium text-slate-500 ml-1.5">Dokumen</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lisensi Aktif</p>
                      <div className="flex items-baseline mt-1.5">
                        <p className="text-2xl font-black text-emerald-600">
                          {Math.round((personnelList.filter(p => p.status_lisensi === 'Aktif').length / (personnelList.length || 1)) * 100)}%
                        </p>
                        <span className="text-xs font-medium text-slate-500 ml-1.5">Kepatuhan</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
                    <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Radio className="w-5 h-5 text-blue-600" />
                      Pintasan Operasional Cepat
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      <button
                        onClick={() => { changeTabWithLoading('reports'); setLogbookMainTab('form'); setSelectedFormKey('access_control'); setIsIframeLoading(true); }}
                        className="p-4 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                      >
                        <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:scale-105 transition-transform">
                          <KeyRound className="w-5 h-5" />
                        </div>
                        <span className="block mt-3 text-xs font-bold text-slate-800">Logbook Access Control</span>
                      </button>

                      <button
                        onClick={() => { changeTabWithLoading('reports'); setLogbookMainTab('form'); setSelectedFormKey('patroli'); setIsIframeLoading(true); }}
                        className="p-4 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                      >
                        <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600 group-hover:scale-105 transition-transform">
                          <Shield className="w-5 h-5" />
                        </div>
                        <span className="block mt-3 text-xs font-bold text-slate-800">Logbook Patroli</span>
                      </button>

                      <button
                        onClick={() => { changeTabWithLoading('reports'); setLogbookMainTab('form'); setSelectedFormKey('penyisiran'); setIsIframeLoading(true); }}
                        className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                      >
                        <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600 group-hover:scale-105 transition-transform">
                          <Search className="w-5 h-5" />
                        </div>
                        <span className="block mt-3 text-xs font-bold text-slate-800">Logbook Penyisiran</span>
                      </button>

                      <button
                        onClick={() => changeTabWithLoading('documents')}
                        className="p-4 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                      >
                        <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-amber-600 group-hover:scale-105 transition-transform">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="block mt-3 text-xs font-bold text-slate-800">Pusat SOP & Regulasi</span>
                      </button>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">Rekapitulasi Logbook Operasional</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Data logbook harian terintegrasi real-time dari Google Sheets.</p>
                        </div>
                        <button
                          onClick={() => { changeTabWithLoading('reports'); setLogbookMainTab('rekap'); }}
                          className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto mt-1 sm:mt-0"
                        >
                          Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Preview Ringkas (3-4 Log Terbaru) */}
                      <div className="space-y-2.5 mb-4">
                        {reportList.slice(0, 3).map((rpt) => (
                          <div key={rpt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">{rpt.id}</span>
                                <span className="font-bold text-slate-900">{rpt.tipe}</span>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-500">{rpt.lokasi}</span>
                              </div>
                              <p className="text-slate-600 mt-1">{rpt.ringkasan}</p>
                            </div>
                            <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                              <span className="text-slate-400 font-mono">{rpt.waktu}</span>
                              <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${rpt.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                {rpt.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tombol Utama Rekap Google Sheets */}
                      <button
                        onClick={() => { changeTabWithLoading('reports'); setLogbookMainTab('rekap'); }}
                        className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                      >
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        Buka Tab 2: Riwayat & Rekap Log (Google Sheets) ↗
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-2xl shadow-sm p-6 text-white border border-slate-800">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold flex items-center gap-2 text-amber-400">
                          <Megaphone className="w-5 h-5" /> Instruksi & Pengumuman Harian
                        </h2>
                        {currentUser.role === 'ADMIN' && (
                          <button
                            onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('announcements'); }}
                            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                          >
                            Kelola
                          </button>
                        )}
                      </div>

                      <div className="space-y-3.5 text-xs">
                        {announcements.map((ann) => (
                          <div key={ann.id} className={`border-l-2 pl-3 ${ann.priority === 'Kritis' ? 'border-red-500' :
                            ann.priority === 'Penting' ? 'border-amber-400' : 'border-blue-400'
                            }`}>
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-slate-400 text-[11px] font-semibold">{ann.shift}</span>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${ann.priority === 'Kritis' ? 'bg-red-500/20 text-red-400' :
                                ann.priority === 'Penting' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                                }`}>
                                {ann.priority}
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-100 text-xs mt-0.5">{ann.title}</h4>
                            <p className="text-slate-300 leading-relaxed mt-1 text-[11px]">{ann.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DYNAMIC EMERGENCY CONTACTS WIDGET */}
                    <div className="bg-blue-600 rounded-2xl shadow-sm p-6 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-blue-200" /> Kontak Darurat AVSEC
                        </h3>
                        {currentUser.role === 'ADMIN' && (
                          <button
                            onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('announcements'); setAnnouncementSubTab('kontak'); }}
                            className="text-[10px] text-blue-200 hover:text-white underline font-semibold"
                          >
                            Edit Kontak
                          </button>
                        )}
                      </div>
                      <div className="mt-3 text-xs space-y-2 text-blue-100 font-medium">
                        {emergencyContacts.map((c) => (
                          <div key={c.id} className="flex justify-between items-center border-b border-blue-500/40 pb-1.5 last:border-0 last:pb-0">
                            <span>{c.nama}:</span>
                            <span className="text-white font-bold font-mono bg-blue-700/60 px-2 py-0.5 rounded">{c.kontak}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: PELAPORAN & LOG OPERASIONAL ================= */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pelaporan & Log Operasional</h1>
                    <p className="text-slate-500 text-sm mt-1">Integrasi Google Form & Google Sheets untuk pencatatan logbook AVSEC terpusat.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLogbookMainTab('form')}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${logbookMainTab === 'form' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                    >
                      <PlusCircle className="w-4 h-4" /> Tab 1: Input Laporan Baru (Google Form)
                    </button>
                    <button
                      onClick={() => setLogbookMainTab('rekap')}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${logbookMainTab === 'rekap' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                    >
                      <FileCheck className="w-4 h-4" /> Tab 2: Riwayat & Rekap Log (Google Sheets)
                    </button>
                  </div>
                </header>

                {/* TAB 1: INPUT LAPORAN BARU (GOOGLE FORM EMBED) */}
                {logbookMainTab === 'form' && (
                  <div className="space-y-5">
                    {/* Logbook Selector Buttons */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">Pilih Form Logbook:</span>
                      <button
                        onClick={() => { setSelectedFormKey('access_control'); setIsIframeLoading(true); }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedFormKey === 'access_control' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        LOGBOOK ACCESS CONTROL
                      </button>
                      <button
                        onClick={() => { setSelectedFormKey('penyisiran'); setIsIframeLoading(true); }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedFormKey === 'penyisiran' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        LOGBOOK PENYISIRAN AVSEC
                      </button>
                      <button
                        onClick={() => { setSelectedFormKey('patroli'); setIsIframeLoading(true); }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedFormKey === 'patroli' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        LOGBOOK PATROLI AVSEC
                      </button>

                      <a
                        href={googleForms[selectedFormKey].nativeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        Buka Form di Tab Baru <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Form Embed Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[780px]">
                      {isIframeLoading && (
                        <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center space-y-3">
                          <Clock className="w-8 h-8 text-blue-600 animate-spin" />
                          <p className="text-sm font-bold text-slate-700">Memuat {googleForms[selectedFormKey].title}...</p>
                        </div>
                      )}
                      <iframe
                        src={googleForms[selectedFormKey].url}
                        onLoad={() => setIsIframeLoading(false)}
                        className="w-full h-[780px] border-0"
                        title={googleForms[selectedFormKey].title}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: RIWAYAT & REKAP LOG (GOOGLE SHEETS / TABLE) */}
                {logbookMainTab === 'rekap' && (
                  <div className="space-y-5">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">Rekapitulasi Data Logbook Google Sheets</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Tampilan data tanggapan yang terhubung langsung dengan spreadsheet internal.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.print()}
                          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          <Printer className="w-4 h-4 text-slate-600" /> Ekspor PDF / Cetak Laporan
                        </button>
                        <a
                          href={googleSheetsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          Buka Google Sheets Full <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Table Custom Representasi Data Sheets */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Log Operasional Terdaftar ({reportList.length})</h4>
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Sync Google Sheets
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                              <th className="p-4">ID Log</th>
                              <th className="p-4">Jenis Laporan</th>
                              <th className="p-4">Lokasi Titik Tugas</th>
                              <th className="p-4">Waktu</th>
                              <th className="p-4">Petugas Pelapor</th>
                              <th className="p-4">Ringkasan / Temuan</th>
                              <th className="p-4">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            {reportList.map((rpt) => (
                              <tr key={rpt.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono font-bold text-slate-900">{rpt.id}</td>
                                <td className="p-4 font-bold text-slate-800">{rpt.tipe}</td>
                                <td className="p-4 font-medium text-slate-600">{rpt.lokasi}</td>
                                <td className="p-4 font-mono text-slate-500">{rpt.waktu}</td>
                                <td className="p-4 font-semibold text-slate-800">{rpt.pelapor}</td>
                                <td className="p-4 max-w-xs truncate text-slate-600" title={rpt.ringkasan}>{rpt.ringkasan}</td>
                                <td className="p-4">
                                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${rpt.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {rpt.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 3: PUSAT SOP & REGULASI ================= */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pusat SOP & Regulasi Aviation Security</h1>
                    <p className="text-slate-500 text-sm mt-1">Akses cepat dokumen acuan kerja, peraturan menteri/dirjen, dan instruksi kerja resmi.</p>
                  </div>
                  {currentUser.role === 'ADMIN' && (
                    <button
                      onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('documents'); openAddDocModal(); }}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer self-start"
                    >
                      <Plus className="w-4 h-4" /> Upload Dokumen Baru
                    </button>
                  )}
                </header>

                {/* Toolbar Filter */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={docSearch}
                      onChange={(e) => setDocSearch(e.target.value)}
                      placeholder="Cari real-time berdasarkan judul atau kode dokumen..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50"
                    />
                  </div>

                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 font-medium text-slate-700"
                  >
                    <option>Semua Kategori</option>
                    <option>Regulasi Dirjen</option>
                    <option>Prosedur</option>
                    <option>Instruksi Kerja</option>
                    <option>SKP/Lisensi Personel</option>
                  </select>
                </div>

                {/* Struktur Tabel Dokumen Modern */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                          <th className="p-4">Kode & Judul Dokumen</th>
                          <th className="p-4">Kategori</th>
                          <th className="p-4">Versi / Tahun</th>
                          <th className="p-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredDocs.map((doc) => (
                          <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl flex-shrink-0 mt-0.5 border border-red-100">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="font-mono text-[11px] font-bold text-slate-500">{doc.nomor}</span>
                                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{doc.title}</h3>
                                  <p className="text-slate-500 text-xs mt-0.5">{doc.deskripsi}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${doc.kategori === 'Regulasi Dirjen' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                doc.kategori === 'Prosedur' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                  doc.kategori === 'SKP/Lisensi Personel' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                    'bg-amber-100 text-amber-700 border border-amber-200'
                                }`}>
                                {doc.kategori}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-slate-600">{doc.versi}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {currentUser.role === 'ADMIN' && (
                                  <button
                                    onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('documents'); openEditDocModal(doc); }}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                    title="Edit Dokumen"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                )}
                                <a
                                  href={doc.drive_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm transition-all"
                                >
                                  Buka di Drive <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: DATA PERSONEL ================= */}
            {activeTab === 'personnel' && (
              <div className="space-y-6">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Direktori Personel AVSEC</h1>
                    <p className="text-slate-500 text-sm mt-1">Data anggota, sertifikasi lisensi (SKP), dan masa berlaku.</p>
                  </div>
                  {currentUser.role === 'ADMIN' && (
                    <button
                      onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('personnel'); openAddPersonnelModal(); }}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer self-start"
                    >
                      <Plus className="w-4 h-4" /> Tambah Personel
                    </button>
                  )}
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="relative w-full sm:w-80">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={personnelSearch}
                        onChange={(e) => setPersonnelSearch(e.target.value)}
                        placeholder="Cari nama, ID Pas, atau jabatan..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-xs text-slate-500 font-semibold">Status:</span>
                      <select
                        value={licenseFilter}
                        onChange={(e) => setLicenseFilter(e.target.value)}
                        className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-slate-50 font-medium text-slate-700"
                      >
                        <option>Semua</option>
                        <option>Aktif</option>
                        <option>Mendekati Expired</option>
                        <option>Kedaluwarsa</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                          <th className="p-4">Nama Lengkap</th>
                          <th className="p-4">ID Pas</th>
                          <th className="p-4">Jabatan</th>
                          <th className="p-4">Kualifikasi Lisensi</th>
                          <th className="p-4">Masa Berlaku</th>
                          <th className="p-4">Status Lisensi</th>
                          <th className="p-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredPersonnel.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-slate-900">{p.nama}</td>
                            <td className="p-4 font-mono font-semibold text-slate-600">{p.id_pas}</td>
                            <td className="p-4 font-medium">{p.jabatan}</td>
                            <td className="p-4">
                              <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-bold text-[11px] border border-slate-200">
                                {p.lisensi}
                              </span>
                            </td>
                            <td className="p-4 font-mono">{p.masa_berlaku}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${p.status_lisensi === 'Aktif' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                p.status_lisensi === 'Kedaluwarsa' ? 'bg-red-100 text-red-700 border border-red-200' :
                                  'bg-amber-100 text-amber-700 border border-amber-200'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${p.status_lisensi === 'Aktif' ? 'bg-emerald-500' :
                                  p.status_lisensi === 'Kedaluwarsa' ? 'bg-red-500' : 'bg-amber-500'
                                  }`} />
                                {p.status_lisensi}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {currentUser.role === 'ADMIN' && (
                                  <button
                                    onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('personnel'); openEditPersonnelModal(p); }}
                                    className="text-slate-400 hover:text-blue-600 p-1 rounded cursor-pointer"
                                    title="Edit Personel"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => showNotification(`Detail Personel: ${p.nama} (Kontak: ${p.kontak})`)}
                                  className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer ml-1"
                                >
                                  Detail
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 5: ADMIN PANEL (ACCORDION CARDS) ================= */}
            {activeTab === 'admin' && currentUser.role === 'ADMIN' && (
              <div className="space-y-8">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg shadow-red-600/30">
                      <Settings className="w-7 h-7" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">Administrator Control Panel</h1>
                      <p className="text-slate-500 text-sm mt-0.5">Pusat kendali personel, otorisasi akun, dokumen SOP & siaran instruksi harian.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs text-slate-700 font-semibold">
                      <Users className="w-4 h-4 text-blue-600" /> {personnelList.length} Personel
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs text-slate-700 font-semibold">
                      <BookOpen className="w-4 h-4 text-indigo-600" /> {docList.length} SOP
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs text-slate-700 font-semibold">
                      <Megaphone className="w-4 h-4 text-amber-600" /> {announcements.length} Pengumuman
                    </div>
                  </div>
                </header>

                <div className="grid grid-cols-1 gap-6">

                  {/* MODUL 1: MANAJEMEN PERSONEL & AKUN */}
                  <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'personnel'
                    ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/10'
                    : 'border-slate-200/90 hover:border-blue-300 hover:shadow-md'
                    }`}>
                    <button
                      onClick={() => setAdminSubTab(adminSubTab === 'personnel' ? null : 'personnel')}
                      className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
                    >
                      <div className="flex items-start md:items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'personnel'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                          : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                          }`}>
                          <Users className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              Manajemen Personel & Pembuatan Akun
                            </h2>
                            <span className="text-xs bg-blue-100 text-blue-700 font-extrabold px-2.5 py-0.5 rounded-full">
                              {personnelList.length} Anggota
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                            Pendaftaran personel baru, pembuatan kredensial login, atur lisensi SKP, dan reset password akun.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                        <div className="flex gap-2 text-xs">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200/60">
                            {personnelList.filter(p => p.status_lisensi === 'Aktif').length} Aktif
                          </span>
                          <span className="bg-amber-50 text-amber-700 font-bold px-3 py-1.5 rounded-xl border border-amber-200/60">
                            {personnelList.filter(p => p.status_lisensi === 'Mendekati Expired').length} Warning
                          </span>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'personnel' ? 'bg-blue-600 text-white rotate-180 shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'
                          }`}>
                          <ChevronRight className="w-5 h-5 rotate-90" />
                        </div>
                      </div>
                    </button>

                    {adminSubTab === 'personnel' && (
                      <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-base">Daftar Personel Terdaftar & Kredensial</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Kelola otorisasi akun dan status keaktifan lisensi personel.</p>
                          </div>
                          <button
                            onClick={openAddPersonnelModal}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4" /> + Tambah Anggota & Pembuatan Kredensial
                          </button>
                        </div>

                        <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                              <thead>
                                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
                                  <th className="px-5 py-4">Nama & ID Pas (Username)</th>
                                  <th className="px-5 py-4">Jabatan / Unit</th>
                                  <th className="px-5 py-4">Lisensi SKP</th>
                                  <th className="px-5 py-4">Role Akses</th>
                                  <th className="px-5 py-4">Status Lisensi</th>
                                  <th className="px-5 py-4 text-center">Aksi Password & Akun</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700">
                                {personnelList.map((p) => (
                                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                                    <td className="px-5 py-4">
                                      <p className="font-bold text-slate-900 text-sm">{p.nama}</p>
                                      <span className="font-mono text-slate-500 text-[11px]">User: {p.username || p.id_pas}</span>
                                    </td>
                                    <td className="px-5 py-4 font-medium text-slate-700">{p.jabatan}</td>
                                    <td className="px-5 py-4">
                                      <span className="bg-slate-800 text-white px-2.5 py-1 rounded-lg font-bold text-[11px]">
                                        {p.lisensi}
                                      </span>
                                    </td>
                                    <td className="px-5 py-4">
                                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${p.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {p.role || 'USER'}
                                      </span>
                                    </td>
                                    <td className="px-5 py-4">
                                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${p.status_lisensi === 'Aktif' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                        p.status_lisensi === 'Kedaluwarsa' ? 'bg-red-100 text-red-700 border border-red-200' :
                                          'bg-amber-100 text-amber-700 border border-amber-200'
                                        }`}>
                                        {p.status_lisensi}
                                      </span>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => openResetPasswordModal(p)}
                                          className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer border border-amber-200"
                                          title="Reset Password Default"
                                        >
                                          <KeyRound className="w-3.5 h-3.5" /> Reset Password
                                        </button>
                                        <button
                                          onClick={() => openEditPersonnelModal(p)}
                                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                          title="Edit Data Personel"
                                        >
                                          <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeletePersonnel(p.id, p.nama)}
                                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                          title="Hapus Personel"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* MODUL 2: MANAJEMEN INSTRUKSI & KONTAK DARURAT (SUB-TABS) */}
                  <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'announcements'
                    ? 'border-amber-500 shadow-xl ring-2 ring-amber-500/10'
                    : 'border-slate-200/90 hover:border-amber-300 hover:shadow-md'
                    }`}>
                    <button
                      onClick={() => setAdminSubTab(adminSubTab === 'announcements' ? null : 'announcements')}
                      className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
                    >
                      <div className="flex items-start md:items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'announcements'
                          ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                          : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'
                          }`}>
                          <Megaphone className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                              Instruksi & Pengumuman Harian / Kelola Kontak Darurat
                            </h2>
                            <span className="text-xs bg-amber-100 text-amber-700 font-extrabold px-2.5 py-0.5 rounded-full">
                              {announcements.length} Siaran
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                            Penerbitan arahan pimpinan shift dan kelola nomor ekstensi/frekuensi radio kontak darurat yang tampil di Dashboard Utama.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                        <div className="flex gap-2 text-xs">
                          <span className="bg-amber-50 text-amber-700 font-bold px-3 py-1.5 rounded-xl border border-amber-200/60">
                            {emergencyContacts.length} Kontak Darurat
                          </span>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'announcements' ? 'bg-amber-500 text-white rotate-180 shadow-md shadow-amber-500/20' : 'bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-white'
                          }`}>
                          <ChevronRight className="w-5 h-5 rotate-90" />
                        </div>
                      </div>
                    </button>

                    {adminSubTab === 'announcements' && (
                      <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-5">
                        {/* Sub-Tab Selector */}
                        <div className="flex border-b border-slate-200 gap-4">
                          <button
                            onClick={() => setAnnouncementSubTab('pengumuman')}
                            className={`pb-3 font-bold text-xs transition-all border-b-2 cursor-pointer ${announcementSubTab === 'pengumuman' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                          >
                            Tab 1: Daftar Pengumuman Shift ({announcements.length})
                          </button>
                          <button
                            onClick={() => setAnnouncementSubTab('kontak')}
                            className={`pb-3 font-bold text-xs transition-all border-b-2 cursor-pointer ${announcementSubTab === 'kontak' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                          >
                            Tab 2: Kontak Darurat & Frekuensi Radio ({emergencyContacts.length})
                          </button>
                        </div>

                        {/* SUB-TAB 1: PENGUMUMAN */}
                        {announcementSubTab === 'pengumuman' && (
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h3 className="font-bold text-slate-900 text-base">Daftar Pengumuman Shift Aktif</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Siaran instruksi yang saat ini dapat dilihat oleh seluruh personel.</p>
                              </div>
                              <button
                                onClick={openAddAnnouncementModal}
                                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                              >
                                <Plus className="w-4 h-4" /> Terbitkan Pengumuman Baru
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {announcements.map((ann) => (
                                <div key={ann.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all">
                                  <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${ann.priority === 'Kritis' ? 'bg-red-100 text-red-700 border border-red-200' :
                                        ann.priority === 'Penting' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                                        }`}>
                                        {ann.priority}
                                      </span>
                                      <span className="text-[11px] text-slate-400 font-medium text-right">{ann.shift}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-sm">{ann.title}</h4>
                                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ann.content}</p>
                                  </div>

                                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => openEditAnnouncementModal(ann)}
                                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" /> Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteAnnouncement(ann.id, ann.title)}
                                      className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* SUB-TAB 2: KONTAK DARURAT */}
                        {announcementSubTab === 'kontak' && (
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h3 className="font-bold text-slate-900 text-base">Kelola Kontak Darurat & Pos Komando AVSEC</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Perubahan pada tabel ini akan secara otomatis memperbarui widget Kontak Darurat pada Dashboard Utama.</p>
                              </div>
                              <button
                                onClick={openAddContactModal}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                              >
                                <Plus className="w-4 h-4" /> + Tambah Kontak Darurat
                              </button>
                            </div>

                            <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
                              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                                <thead>
                                  <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                                    <th className="p-4">Nama Pos / Unit</th>
                                    <th className="p-4">Jenis Kontak / Frekuensi Radio</th>
                                    <th className="p-4">Status Aksesibilitas</th>
                                    <th className="p-4 text-center">Aksi</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                  {emergencyContacts.map((c) => (
                                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                                      <td className="p-4 font-bold text-slate-900">{c.nama}</td>
                                      <td className="p-4 font-mono font-bold text-blue-600 text-sm">{c.kontak}</td>
                                      <td className="p-4">
                                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                                          {c.status}
                                        </span>
                                      </td>
                                      <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                          <button
                                            onClick={() => openEditContactModal(c)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                            title="Edit Kontak"
                                          >
                                            <Edit3 className="w-4 h-4" />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteContact(c.id, c.nama)}
                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="Hapus Kontak"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* MODUL 3: MANAJEMEN SOP */}
                  <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'documents'
                    ? 'border-indigo-500 shadow-xl ring-2 ring-indigo-500/10'
                    : 'border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
                    }`}>
                    <button
                      onClick={() => setAdminSubTab(adminSubTab === 'documents' ? null : 'documents')}
                      className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
                    >
                      <div className="flex items-start md:items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'documents'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                          : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                          }`}>
                          <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              Manajemen SOP & Link Google Drive
                            </h2>
                            <span className="text-xs bg-indigo-100 text-indigo-700 font-extrabold px-2.5 py-0.5 rounded-full">
                              {docList.length} Berkas
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                            Pusat pengunggahan dan pembaruan berkas Standard Operating Procedure (SOP) dan tautan Google Drive.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                        <div className="flex gap-2 text-xs">
                          <span className="bg-purple-50 text-purple-700 font-bold px-3 py-1.5 rounded-xl border border-purple-200/60">
                            {docList.filter(d => d.kategori === 'Regulasi Dirjen').length} Regulasi
                          </span>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'documents' ? 'bg-indigo-600 text-white rotate-180 shadow-md shadow-indigo-600/20' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white'
                          }`}>
                          <ChevronRight className="w-5 h-5 rotate-90" />
                        </div>
                      </div>
                    </button>

                    {adminSubTab === 'documents' && (
                      <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-base">Katalog Dokumen Resmi</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Kelola aksesibiltas dokumen acuan kerja personel.</p>
                          </div>
                          <button
                            onClick={openAddDocModal}
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4" /> Unggah SOP Baru
                          </button>
                        </div>

                        <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                              <thead>
                                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
                                  <th className="px-5 py-4">Judul Dokumen</th>
                                  <th className="px-5 py-4">Nomor SOP</th>
                                  <th className="px-5 py-4">Kategori</th>
                                  <th className="px-5 py-4">Versi</th>
                                  <th className="px-5 py-4 text-center">Aksi</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700">
                                {docList.map((doc) => (
                                  <tr key={doc.id} className="hover:bg-indigo-50/40 transition-colors">
                                    <td className="px-5 py-4 font-bold text-slate-900 max-w-xs truncate" title={doc.title}>{doc.title}</td>
                                    <td className="px-5 py-4 font-mono text-slate-600 font-semibold">{doc.nomor}</td>
                                    <td className="px-5 py-4">
                                      <span className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-blue-100 text-blue-700">
                                        {doc.kategori}
                                      </span>
                                    </td>
                                    <td className="px-5 py-4 font-mono text-slate-600">{doc.versi}</td>
                                    <td className="px-5 py-4 text-center">
                                      <div className="flex items-center justify-center gap-1.5">
                                        <button
                                          onClick={() => openEditDocModal(doc)}
                                          className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                          title="Edit Dokumen"
                                        >
                                          <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteDoc(doc.id, doc.title)}
                                          className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                          title="Hapus Dokumen"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* MODUL 4: PENGATURAN KREDENSIAL & KEAMANAN AKUN ADMIN */}
                  <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'security'
                    ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/10'
                    : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
                    }`}>
                    <button
                      onClick={() => setAdminSubTab(adminSubTab === 'security' ? null : 'security')}
                      className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
                    >
                      <div className="flex items-start md:items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'security'
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                          : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                          }`}>
                          <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              Profil & Keamanan Akun Admin
                            </h2>
                            <span className="text-xs bg-emerald-100 text-emerald-700 font-extrabold px-2.5 py-0.5 rounded-full">
                              Privat Admin
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                            Ubah kredensial pribadi administrator (Username / ID Pas) dan kata sandi dengan indikator keamanan password.
                          </p>
                        </div>
                      </div>

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'security' ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-600 group-hover:text-white'
                        }`}>
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </button>

                    {adminSubTab === 'security' && (
                      <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-6">
                        <form onSubmit={handleSaveAdminSecurity} className="max-w-xl space-y-4 text-xs">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Username / ID Pas Saat Ini</label>
                            <input
                              type="text"
                              value={currentUser.username}
                              disabled
                              className="w-full p-2.5 bg-slate-200 border border-slate-300 rounded-xl text-slate-600 font-mono font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Username / ID Pas Baru</label>
                            <input
                              type="text"
                              value={adminSecurityForm.newUsername}
                              onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, newUsername: e.target.value })}
                              placeholder="Biarkan kosong jika tidak diubah"
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>

                          <hr className="my-3 border-slate-200" />

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Password Saat Ini</label>
                            <input
                              type="password"
                              value={adminSecurityForm.currentPass}
                              onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, currentPass: e.target.value })}
                              placeholder="••••••••"
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="block font-bold text-slate-700">Password Baru</label>
                              {adminSecurityForm.newPass && (
                                <span className={`font-bold text-[11px] ${getPasswordStrength(adminSecurityForm.newPass).color}`}>
                                  Kekuatan: {getPasswordStrength(adminSecurityForm.newPass).label}
                                </span>
                              )}
                            </div>
                            <input
                              type="password"
                              value={adminSecurityForm.newPass}
                              onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, newPass: e.target.value })}
                              placeholder="Minimal 6 karakter"
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                            {adminSecurityForm.newPass && (
                              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                <div className={`h-full transition-all duration-300 ${getPasswordStrength(adminSecurityForm.newPass).bg} ${getPasswordStrength(adminSecurityForm.newPass).width}`} />
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Konfirmasi Password Baru</label>
                            <input
                              type="password"
                              value={adminSecurityForm.confirmPass}
                              onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, confirmPass: e.target.value })}
                              placeholder="Ketik ulang password baru"
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                          >
                            <Save className="w-4 h-4" /> Simpan Perubahan Kredensial
                          </button>
                        </form>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

          </>
        )}

      </main>

      {/* ================= MODAL: FIRST TIME LOGIN (PAKSA GANTI PASSWORD) ================= */}
      {isFirstLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold">Wajib Ganti Password Pertama Kali</h3>
                <p className="text-xs text-slate-400">Demi keamanan akun, silakan ubah password bawaan Anda.</p>
              </div>
            </div>

            {firstLoginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{firstLoginError}</span>
              </div>
            )}

            <form onSubmit={handleSaveFirstLoginPassword} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password Baru</label>
                <input
                  type="password"
                  value={firstLoginPassForm.newPass}
                  onChange={(e) => setFirstLoginPassForm({ ...firstLoginPassForm, newPass: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Minimal 6 karakter"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={firstLoginPassForm.confirmPass}
                  onChange={(e) => setFirstLoginPassForm({ ...firstLoginPassForm, confirmPass: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ketik ulang password baru"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all text-xs cursor-pointer mt-2"
              >
                Simpan & Lanjutkan Masuk Portal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: TAMBAH / EDIT KONTAK DARURAT ================= */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                {editingContact ? 'Edit Kontak Darurat' : 'Tambah Kontak Darurat Baru'}
              </h3>
              <button onClick={() => setIsContactModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Pos / Unit</label>
                <input
                  type="text"
                  value={contactForm.nama}
                  onChange={(e) => setContactForm({ ...contactForm, nama: e.target.value })}
                  placeholder="Contoh: Pos Komando AVSEC / Tower ATC Wunopito"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jenis Kontak / Ekstensi / Frekuensi Radio</label>
                <input
                  type="text"
                  value={contactForm.kontak}
                  onChange={(e) => setContactForm({ ...contactForm, kontak: e.target.value })}
                  placeholder="Contoh: Ext. 101 atau Freq 122.4 MHz"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status Aksesibilitas</label>
                <select
                  value={contactForm.status}
                  onChange={(e) => setContactForm({ ...contactForm, status: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                >
                  <option>24 Jam Aktif</option>
                  <option>Jam Operasional Bandara</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Kontak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: TAMBAH / EDIT PERSONEL ================= */}
      {isPersonnelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {editingPersonnel ? 'Edit Data Personel' : 'Tambah Personel & Pembuatan Kredensial'}
              </h3>
              <button onClick={() => setIsPersonnelModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePersonnel} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Personel</label>
                <input
                  type="text"
                  value={personnelForm.nama}
                  onChange={(e) => setPersonnelForm({ ...personnelForm, nama: e.target.value })}
                  placeholder="Contoh: Antonius Fernandez"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ID Pas Bandara / NIP (Username)</label>
                  <input
                    type="text"
                    value={personnelForm.id_pas}
                    onChange={(e) => setPersonnelForm({ ...personnelForm, id_pas: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan / Unit</label>
                  <input
                    type="text"
                    value={personnelForm.jabatan}
                    onChange={(e) => setPersonnelForm({ ...personnelForm, jabatan: e.target.value })}
                    placeholder="Contoh: Operator X-Ray"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kualifikasi Lisensi (SKP)</label>
                  <select
                    value={personnelForm.lisensi}
                    onChange={(e) => setPersonnelForm({ ...personnelForm, lisensi: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  >
                    <option>Basic</option>
                    <option>Junior</option>
                    <option>Senior</option>
                    <option>Non Lisensi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role Akses System</label>
                  <select
                    value={personnelForm.role}
                    onChange={(e) => setPersonnelForm({ ...personnelForm, role: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  >
                    <option value="USER">Petugas Operasional (User)</option>
                    <option value="ADMIN">Administrator (Admin)</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-bold text-slate-700">Password Bawaan / Default</label>
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Generate Password Acak
                  </button>
                </div>
                <input
                  type="text"
                  value={personnelForm.password_default}
                  onChange={(e) => setPersonnelForm({ ...personnelForm, password_default: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-slate-800 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Lisensi</label>
                  <select
                    value={personnelForm.status_lisensi}
                    onChange={(e) => setPersonnelForm({ ...personnelForm, status_lisensi: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  >
                    <option>Aktif</option>
                    <option>Mendekati Expired</option>
                    <option>Kedaluwarsa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Masa Berlaku Lisensi</label>
                  <input
                    type="date"
                    value={personnelForm.masa_berlaku}
                    onChange={(e) => setPersonnelForm({ ...personnelForm, masa_berlaku: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPersonnelModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Personel & Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: RESET PASSWORD AKUN ================= */}
      {isPasswordModalOpen && resetTargetUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-500" />
                Reset Password Akun Personel
              </h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResetPassword} className="space-y-4 text-xs">
              <p className="text-slate-600">
                Kembalikan password login untuk personel: <b className="text-slate-900">{resetTargetUser.nama}</b> ({resetTargetUser.id_pas}) ke password default.
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password Default Pengembalian</label>
                <input
                  type="text"
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm font-bold text-slate-800"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Konfirmasi Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: TAMBAH / EDIT DOKUMEN SOP ================= */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                {editingDoc ? 'Edit Data Dokumen SOP' : 'Unggah Dokumen SOP Baru'}
              </h3>
              <button onClick={() => setIsDocModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Dokumen / Pedoman</label>
                <input
                  type="text"
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  placeholder="Contoh: SOP Penanganan Ancaman Bom di Bandara"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Google Drive (Target _blank)</label>
                <input
                  type="url"
                  value={docForm.drive_url}
                  onChange={(e) => setDocForm({ ...docForm, drive_url: e.target.value })}
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Dokumen</label>
                  <input
                    type="text"
                    value={docForm.nomor}
                    onChange={(e) => setDocForm({ ...docForm, nomor: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Dokumen</label>
                  <select
                    value={docForm.kategori}
                    onChange={(e) => setDocForm({ ...docForm, kategori: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  >
                    <option>Regulasi Dirjen</option>
                    <option>Prosedur</option>
                    <option>Instruksi Kerja</option>
                    <option>SKP/Lisensi Personel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Versi / Tahun</label>
                  <input
                    type="text"
                    value={docForm.versi}
                    onChange={(e) => setDocForm({ ...docForm, versi: e.target.value })}
                    placeholder="v1.0 / 2026"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimasi Ukuran File</label>
                  <input
                    type="text"
                    value={docForm.ukuran}
                    onChange={(e) => setDocForm({ ...docForm, ukuran: e.target.value })}
                    placeholder="Contoh: 3.2 MB"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: TAMBAH / EDIT PENGUMUMAN ================= */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-500" />
                {editingAnnouncement ? 'Edit Pengumuman / Instruksi' : 'Terbitkan Pengumuman Baru'}
              </h3>
              <button onClick={() => setIsAnnouncementModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul / Subjek Instruksi</label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="Contoh: Pemeriksaan Ketat Bagasi Flight Siang"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Shift / Unit</label>
                  <select
                    value={announcementForm.shift}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, shift: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  >
                    <option>Shift Pagi (06:00 - 14:00 WITA)</option>
                    <option>Shift Siang (14:00 - 22:00 WITA)</option>
                    <option>Perimeter Security</option>
                    <option>Semua Personel</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tingkat Prioritas</label>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  >
                    <option>Normal</option>
                    <option>Penting</option>
                    <option>Kritis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rincian Instruksi</label>
                <textarea
                  rows={4}
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  placeholder="Tuliskan arahan tugas yang perlu diperhatikan oleh personel..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Terbitkan ke Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}