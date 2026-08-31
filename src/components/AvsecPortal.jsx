import React, { useState } from 'react';
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
  Megaphone
} from 'lucide-react';

import logo from '../assets/logo.jpeg';

const initialPersonnel = [
  { id: '1', nama: 'Budi Santoso', id_pas: 'AV-001', jabatan: 'Komandan Regu', lisensi: 'Senior', status_lisensi: 'Aktif', masa_berlaku: '2027-10-12', kontak: '0812-3456-7890', username: 'budi_av' },
  { id: '2', nama: 'Siti Aminah', id_pas: 'AV-042', jabatan: 'Operator X-Ray', lisensi: 'Junior', status_lisensi: 'Mendekati Expired', masa_berlaku: '2026-09-15', kontak: '0813-9876-5432', username: 'siti_av' },
  { id: '3', nama: 'Ahmad Dahlan', id_pas: 'AV-088', jabatan: 'Petugas Patroli', lisensi: 'Basic', status_lisensi: 'Kedaluwarsa', masa_berlaku: '2026-01-20', kontak: '0852-1122-3344', username: 'ahmad_av' },
  { id: '4', nama: 'Diana Putri', id_pas: 'AV-015', jabatan: 'Supervisor', lisensi: 'Management', status_lisensi: 'Aktif', masa_berlaku: '2028-05-01', kontak: '0821-5566-7788', username: 'diana_av' },
  { id: '5', nama: 'Yohanes Lera', id_pas: 'AV-023', jabatan: 'Petugas Screening SCP 1', lisensi: 'Junior', status_lisensi: 'Aktif', masa_berlaku: '2027-04-18', kontak: '0813-4455-6677', username: 'yohanes_av' },
  { id: '6', nama: 'Maria Magdalena', id_pas: 'AV-031', jabatan: 'Operator CCTV & Access Control', lisensi: 'Basic', status_lisensi: 'Aktif', masa_berlaku: '2027-11-30', kontak: '0857-8899-0011', username: 'maria_av' }
];

const initialDocs = [
  { id: '1', title: 'SOP Pemeriksaan Penumpang & Barang Bawaan (SCP 1 & 2)', kategori: 'Prosedur', tanggal: '2025-11-10', ukuran: '2.4 MB', nomor: 'SOP/AVSEC-WNP/001/2025' },
  { id: '2', title: 'KP 167 Tahun 2023 - Program Keamanan Penerbangan Nasional', kategori: 'Regulasi Dirjen', tanggal: '2023-08-22', ukuran: '5.1 MB', nomor: 'KP 167/2023' },
  { id: '3', title: 'Instruksi Kerja Pengoperasian & Kalibrasi Mesin X-Ray Dual View', kategori: 'Instruksi Kerja', tanggal: '2026-02-15', ukuran: '1.2 MB', nomor: 'IK/AVSEC/XR-04' },
  { id: '4', title: 'Prosedur Penanganan Barang Dilarang (Prohibited Items & Dangerous Goods)', kategori: 'Prosedur', tanggal: '2025-12-01', ukuran: '3.0 MB', nomor: 'SOP/AVSEC-WNP/007/2025' },
  { id: '5', title: 'Prosedur Tanggap Darurat Keamanan Penerbangan (Airport Emergency Plan)', kategori: 'Prosedur', tanggal: '2025-09-14', ukuran: '4.8 MB', nomor: 'AEP/WNP/REV-03' },
  { id: '6', title: 'Instruksi Kerja Patroli Sisi Udara (Airside Perimeter Security)', kategori: 'Instruksi Kerja', tanggal: '2026-01-10', ukuran: '1.5 MB', nomor: 'IK/AVSEC/PAT-02' }
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

export default function AvsecPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  // State for Announcements
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  // State for Reports
  const [reportList, setReportList] = useState(initialReports);
  const [reportType, setReportType] = useState('Log Patroli Harian');
  const [reportLocation, setReportLocation] = useState('');
  const [reportSummary, setReportSummary] = useState('');
  const [reportUrgency, setReportUrgency] = useState('Normal');
  const [reportSuccessMsg, setReportSuccessMsg] = useState('');

  // Admin SubTab State (Default tertutup/null)
  const [adminSubTab, setAdminSubTab] = useState(null);

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
    username: ''
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
    ukuran: '1.5 MB'
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

  // ---------------- AUTH HANDLERS ----------------
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setCurrentUser({ id: 'u1', username: 'admin', nama_lengkap: 'Admin Wunopito', role: 'ADMIN', status_aktif: true });
        setActiveTab('dashboard');
      } else if (username === 'user' && password === 'user123') {
        setCurrentUser({ id: 'u2', username: 'user', nama_lengkap: 'Petugas AVSEC Wunopito', role: 'USER', status_aktif: true });
        setActiveTab('dashboard');
      } else {
        setLoginError('Kredensial tidak valid. Silakan gunakan kredensial demo.');
      }
      setIsLoggingIn(false);
    }, 500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setActiveTab('dashboard');
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
      username: ''
    });
    setIsPersonnelModalOpen(true);
  };

  const openEditPersonnelModal = (person) => {
    setEditingPersonnel(person);
    setPersonnelForm({ ...person });
    setIsPersonnelModalOpen(true);
  };

  const handleSavePersonnel = (e) => {
    e.preventDefault();
    if (!personnelForm.nama || !personnelForm.jabatan) {
      alert('Nama dan Jabatan wajib diisi!');
      return;
    }

    if (editingPersonnel) {
      setPersonnelList(personnelList.map(p => p.id === editingPersonnel.id ? { ...p, ...personnelForm } : p));
      showNotification(`Data personel ${personnelForm.nama} berhasil diperbarui.`);
    } else {
      const newPerson = {
        id: String(Date.now()),
        ...personnelForm,
        username: personnelForm.username || personnelForm.nama.toLowerCase().replace(/\s+/g, '_')
      };
      setPersonnelList([...personnelList, newPerson]);
      showNotification(`Personel baru ${newPerson.nama} berhasil didaftarkan.`);
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
    setNewPasswordValue('avsec123!');
    setIsPasswordModalOpen(true);
  };

  const handleSaveResetPassword = (e) => {
    e.preventDefault();
    showNotification(`Password untuk akun ${resetTargetUser.nama} berhasil direset menjadi: ${newPasswordValue}`);
    setIsPasswordModalOpen(false);
  };

  // ---------------- ADMIN: DOCUMENT CRUD ----------------
  const openAddDocModal = () => {
    setEditingDoc(null);
    setDocForm({
      title: '',
      nomor: `SOP/AVSEC-WNP/00${docList.length + 1}/2026`,
      kategori: 'Prosedur',
      tanggal: new Date().toISOString().split('T')[0],
      ukuran: '2.0 MB'
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
                  <span className="text-slate-400">Unit AVSEC Bandara Wunopito</span>
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

              <div className="mt-6 p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <p className="font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Kredensial Uji Coba:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
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
          <button onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} className={navItemClass('dashboard')}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button onClick={() => { setActiveTab('reports'); setIsMobileMenuOpen(false); }} className={navItemClass('reports')}>
            <FileText className="w-5 h-5 mr-3" /> Pelaporan & Log
          </button>
          <button onClick={() => { setActiveTab('documents'); setIsMobileMenuOpen(false); }} className={navItemClass('documents')}>
            <BookOpen className="w-5 h-5 mr-3" /> Pusat SOP & Regulasi
          </button>
          <button onClick={() => { setActiveTab('personnel'); setIsMobileMenuOpen(false); }} className={navItemClass('personnel')}>
            <Users className="w-5 h-5 mr-3" /> Data Personel
          </button>

          {currentUser.role === 'ADMIN' && (
            <>
              <div className="pt-4 pb-2 px-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Area Administrator</p>
              </div>
              <button onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }} className={navItemClass('admin')}>
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
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">

        {/* ================= TAB 1: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard Operasional</h1>
                <p className="text-slate-500 text-sm mt-1">Bandara Wunopito (WNP / WATW) - Unit Aviation Security</p>
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
                    onClick={() => { setActiveTab('reports'); setReportType('Log Patroli Harian'); }}
                    className="p-4 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                  >
                    <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:scale-105 transition-transform">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="block mt-3 text-xs font-bold text-slate-800">Input Patroli</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('reports'); setReportType('Laporan Insiden (Darurat)'); }}
                    className="p-4 bg-slate-50 hover:bg-red-50 hover:border-red-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                  >
                    <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-red-600 group-hover:scale-105 transition-transform">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <span className="block mt-3 text-xs font-bold text-slate-800">Lapor Insiden</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('documents')}
                    className="p-4 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                  >
                    <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-amber-600 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="block mt-3 text-xs font-bold text-slate-800">Cari SOP</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('personnel')}
                    className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
                  >
                    <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="block mt-3 text-xs font-bold text-slate-800">Cek Lisensi</span>
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-800">Laporan Operasional Terkini</h3>
                    <button onClick={() => setActiveTab('reports')} className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                      Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2.5">
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
                        onClick={() => { setActiveTab('admin'); setAdminSubTab('announcements'); }}
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

                <div className="bg-blue-600 rounded-2xl shadow-sm p-6 text-white">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-200" /> Kontak Darurat AVSEC
                  </h3>
                  <div className="mt-3 text-xs space-y-1.5 text-blue-100 font-medium">
                    <p>Pos Komando AVSEC: <span className="text-white font-bold font-mono">Ext. 101</span></p>
                    <p>Airport Security Executive: <span className="text-white font-bold font-mono">Ext. 102</span></p>
                    <p>Tower ATC Wunopito: <span className="text-white font-bold font-mono">Freq 122.4 MHz</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PELAPORAN & LOG ================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <header>
              <h1 className="text-2xl font-bold text-slate-900">Sistem Pelaporan Terpadu AVSEC</h1>
              <p className="text-slate-500 text-sm mt-1">Input log patroli harian, pemeriksaan kendaraan/orang, dan pelaporan insiden darurat.</p>
            </header>

            {reportSuccessMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="font-medium">{reportSuccessMsg}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-blue-600" />
                  Buat Laporan Baru
                </h2>

                <form onSubmit={handleCreateReport} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Jenis Laporan</label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>Log Patroli Harian</option>
                      <option>Pemeriksaan Kendaraan & Orang</option>
                      <option>Penemuan Barang Terlarang</option>
                      <option>Pemeriksaan Fasilitas & X-Ray</option>
                      <option>Laporan Insiden (Darurat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Lokasi / Titik Tugas</label>
                    <input
                      type="text"
                      value={reportLocation}
                      onChange={(e) => setReportLocation(e.target.value)}
                      placeholder="Contoh: SCP 1, Sisi Udara Pagar Selatan, dll."
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tingkat Urgensi</label>
                    <select
                      value={reportUrgency}
                      onChange={(e) => setReportUrgency(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>Normal (Rutin)</option>
                      <option>Sedang (Perlu Pantauan)</option>
                      <option>Tinggi (Darurat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Keterangan / Temuan</label>
                    <textarea
                      rows={4}
                      value={reportSummary}
                      onChange={(e) => setReportSummary(e.target.value)}
                      placeholder="Tuliskan rincian hasil pemeriksaan atau kejadian..."
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md text-sm transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Kirim Laporan
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-blue-600" />
                    Daftar Log Laporan Aktif ({reportList.length})
                  </h2>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {reportList.map((rpt) => (
                    <div key={rpt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2 transition-all hover:border-slate-300">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">{rpt.id}</span>
                          <h4 className="font-bold text-sm text-slate-900">{rpt.tipe}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {rpt.waktu}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${rpt.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                            }`}>
                            {rpt.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">{rpt.ringkasan}</p>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Lokasi: <b className="text-slate-700">{rpt.lokasi}</b></span>
                        <span>Pelapor: <b className="text-slate-700">{rpt.pelapor}</b></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PUSAT DOKUMEN & SOP ================= */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Pusat SOP, Regulasi & Instruksi Kerja</h1>
                <p className="text-slate-500 text-sm mt-1">Akses cepat dokumen acuan kerja dan pedoman keamanan penerbangan.</p>
              </div>
              {currentUser.role === 'ADMIN' && (
                <button
                  onClick={() => { setActiveTab('admin'); setAdminSubTab('documents'); openAddDocModal(); }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer self-start"
                >
                  <Plus className="w-4 h-4" /> Upload Dokumen Baru
                </button>
              )}
            </header>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  placeholder="Cari nama dokumen, nomor SOP, atau regulasi..."
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
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all group">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${doc.kategori === 'Regulasi Dirjen' ? 'bg-purple-100 text-purple-700' :
                        doc.kategori === 'Prosedur' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                        {doc.kategori}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{doc.nomor}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mt-3 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>{doc.tanggal}</span>
                      <span>• {doc.ukuran}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {currentUser.role === 'ADMIN' && (
                        <button
                          onClick={() => { setActiveTab('admin'); setAdminSubTab('documents'); openEditDocModal(doc); }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Dokumen"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => showNotification(`Mengunduh dokumen: ${doc.title}`)}
                        className="flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Unduh PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                  onClick={() => { setActiveTab('admin'); setAdminSubTab('personnel'); openAddPersonnelModal(); }}
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
                                onClick={() => { setActiveTab('admin'); setAdminSubTab('personnel'); openEditPersonnelModal(p); }}
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

        {/* ================= TAB 5: ADMIN PANEL (COLLAPSIBLE CARDS) ================= */}
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
                          Manajemen Personel & Akun
                        </h2>
                        <span className="text-xs bg-blue-100 text-blue-700 font-extrabold px-2.5 py-0.5 rounded-full">
                          {personnelList.length} Anggota
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Kelola pendaftaran anggota AVSEC, atur kualifikasi lisensi SKP, reset password akses, dan pembaruan data personel.
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
                        <h3 className="font-bold text-slate-900 text-base">Daftar Personel Terdaftar</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Kelola otorisasi dan status keaktifan lisensi personel.</p>
                      </div>
                      <button
                        onClick={openAddPersonnelModal}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Daftarkan Personel Baru
                      </button>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
                              <th className="px-5 py-4">Nama & ID Pas</th>
                              <th className="px-5 py-4">Jabatan / Unit</th>
                              <th className="px-5 py-4">Lisensi SKP</th>
                              <th className="px-5 py-4">Masa Berlaku</th>
                              <th className="px-5 py-4">Status</th>
                              <th className="px-5 py-4">Kontak</th>
                              <th className="px-5 py-4 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            {personnelList.map((p) => (
                              <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                                <td className="px-5 py-4">
                                  <p className="font-bold text-slate-900 text-sm">{p.nama}</p>
                                  <span className="font-mono text-slate-500 text-[11px]">{p.id_pas}</span>
                                </td>
                                <td className="px-5 py-4 font-medium text-slate-700">{p.jabatan}</td>
                                <td className="px-5 py-4">
                                  <span className="bg-slate-800 text-white px-2.5 py-1 rounded-lg font-bold text-[11px]">
                                    {p.lisensi}
                                  </span>
                                </td>
                                <td className="px-5 py-4 font-mono text-slate-600">{p.masa_berlaku}</td>
                                <td className="px-5 py-4">
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
                                <td className="px-5 py-4 font-mono text-slate-600">{p.kontak}</td>
                                <td className="px-5 py-4 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      onClick={() => openEditPersonnelModal(p)}
                                      className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                      title="Edit Data"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => openResetPasswordModal(p)}
                                      className="p-2 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                      title="Reset Password"
                                    >
                                      <KeyRound className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeletePersonnel(p.id, p.nama)}
                                      className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
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

              {/* MODUL 2: MANAJEMEN DOKUMEN SOP */}
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
                          Manajemen SOP & Regulasi
                        </h2>
                        <span className="text-xs bg-indigo-100 text-indigo-700 font-extrabold px-2.5 py-0.5 rounded-full">
                          {docList.length} Berkas
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Pusat pengunggahan dan pembaruan berkas Standard Operating Procedure (SOP), Peraturan Dirjen, dan Instruksi Kerja penerbangan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    <div className="flex gap-2 text-xs">
                      <span className="bg-purple-50 text-purple-700 font-bold px-3 py-1.5 rounded-xl border border-purple-200/60">
                        {docList.filter(d => d.kategori === 'Regulasi Dirjen').length} Regulasi
                      </span>
                      <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-xl border border-blue-200/60">
                        {docList.filter(d => d.kategori === 'Prosedur').length} Prosedur
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
                              <th className="px-5 py-4">Tgl Penetapan</th>
                              <th className="px-5 py-4">Ukuran</th>
                              <th className="px-5 py-4 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            {docList.map((doc) => (
                              <tr key={doc.id} className="hover:bg-indigo-50/40 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 max-w-xs" title={doc.title}>
                                  <p className="truncate max-w-[280px]">{doc.title}</p>
                                </td>
                                <td className="px-5 py-4 font-mono text-slate-600 font-semibold text-[11px]">{doc.nomor}</td>
                                <td className="px-5 py-4">
                                  <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] ${doc.kategori === 'Regulasi Dirjen' ? 'bg-purple-100 text-purple-700' :
                                    doc.kategori === 'Prosedur' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                    {doc.kategori}
                                  </span>
                                </td>
                                <td className="px-5 py-4 font-mono text-slate-600">{doc.tanggal}</td>
                                <td className="px-5 py-4 text-slate-500">{doc.ukuran}</td>
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

              {/* MODUL 3: MANAJEMEN INSTRUKSI & PENGUMUMAN */}
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
                          Instruksi & Pengumuman Harian
                        </h2>
                        <span className="text-xs bg-amber-100 text-amber-700 font-extrabold px-2.5 py-0.5 rounded-full">
                          {announcements.length} Siaran
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Penerbitan arahan pimpinan, atensi khusus shift, dan pengumuman mendesak yang langsung tampil pada Dashboard personel.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    <div className="flex gap-2 text-xs">
                      {announcements.filter(a => a.priority === 'Kritis').length > 0 && (
                        <span className="bg-red-50 text-red-700 font-bold px-3 py-1.5 rounded-xl border border-red-200/60 animate-pulse">
                          {announcements.filter(a => a.priority === 'Kritis').length} Kritis
                        </span>
                      )}
                      <span className="bg-amber-50 text-amber-700 font-bold px-3 py-1.5 rounded-xl border border-amber-200/60">
                        {announcements.filter(a => a.priority === 'Penting').length} Penting
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Daftar Pengumuman Aktif</h3>
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
                                <span className={`w-1.5 h-1.5 rounded-full ${ann.priority === 'Kritis' ? 'bg-red-500' :
                                  ann.priority === 'Penting' ? 'bg-amber-500' : 'bg-blue-500'
                                  }`} />
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
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ================= MODAL: TAMBAH / EDIT PERSONEL ================= */}
      {isPersonnelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {editingPersonnel ? 'Edit Data Personel' : 'Tambah Personel Baru'}
              </h3>
              <button onClick={() => setIsPersonnelModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePersonnel} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap</label>
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
                  <label className="block font-bold text-slate-700 mb-1">ID Pas Bandara</label>
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
                    <option>Management</option>
                  </select>
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Kontak / WhatsApp</label>
                  <input
                    type="text"
                    value={personnelForm.kontak}
                    onChange={(e) => setPersonnelForm({ ...personnelForm, kontak: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
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
                  <Save className="w-4 h-4" /> Simpan Personel
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
                Reset Password Akun
              </h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResetPassword} className="space-y-4 text-xs">
              <p className="text-slate-600">
                Reset kata sandi login untuk personel: <b className="text-slate-900">{resetTargetUser.nama}</b> ({resetTargetUser.id_pas}).
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password Baru</label>
                <input
                  type="text"
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
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
                  Konfirmasi Reset
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
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Penetapan / Berlaku</label>
                  <input
                    type="date"
                    value={docForm.tanggal}
                    onChange={(e) => setDocForm({ ...docForm, tanggal: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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