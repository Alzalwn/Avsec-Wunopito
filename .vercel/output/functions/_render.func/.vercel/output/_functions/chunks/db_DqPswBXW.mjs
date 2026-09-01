import fs from 'fs';
import path from 'path';

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'avsec_db.json');

const initialData = {
  personnel: [
    { id: '1', nama: 'Budi Santoso', id_pas: 'AV-001', jabatan: 'Komandan Regu', lisensi: 'Senior', status_lisensi: 'Aktif', masa_berlaku: '2027-10-12', kontak: '0812-3456-7890', username: 'AV-001', role: 'ADMIN', is_first_login: false },
    { id: '2', nama: 'Siti Aminah', id_pas: 'AV-042', jabatan: 'Operator X-Ray', lisensi: 'Junior', status_lisensi: 'Mendekati Expired', masa_berlaku: '2026-09-15', kontak: '0813-9876-5432', username: 'AV-042', role: 'USER', is_first_login: false },
    { id: '3', nama: 'Ahmad Dahlan', id_pas: 'AV-088', jabatan: 'Petugas Patroli', lisensi: 'Basic', status_lisensi: 'Kedaluwarsa', masa_berlaku: '2026-01-20', kontak: '0852-1122-3344', username: 'AV-088', role: 'USER', is_first_login: true },
    { id: '4', nama: 'Diana Putri', id_pas: 'AV-015', jabatan: 'Supervisor', lisensi: 'Senior', status_lisensi: 'Aktif', masa_berlaku: '2028-05-01', kontak: '0821-5566-7788', username: 'AV-015', role: 'ADMIN', is_first_login: false },
    { id: '5', nama: 'Yohanes Lera', id_pas: 'AV-023', jabatan: 'Petugas Screening SCP 1', lisensi: 'Junior', status_lisensi: 'Aktif', masa_berlaku: '2027-04-18', kontak: '0813-4455-6677', username: 'AV-023', role: 'USER', is_first_login: false },
    { id: '6', nama: 'Maria Magdalena', id_pas: 'AV-031', jabatan: 'Operator CCTV & Access Control', lisensi: 'Non Lisensi', status_lisensi: 'Aktif', masa_berlaku: '2027-11-30', kontak: '0857-8899-0011', username: 'AV-031', role: 'USER', is_first_login: false }
  ],
  docs: [
    { id: '1', title: 'SOP Pemeriksaan Penumpang & Barang Bawaan (SCP 1 & 2)', kategori: 'Prosedur', tanggal: '2025-11-10', ukuran: '2.4 MB', nomor: 'SOP/AVSEC-WNP/001/2025', versi: 'v2.1 / 2025', deskripsi: 'Pedoman standar operasional pemeriksaan fisik dan mesin X-Ray di titik SCP 1 & 2.', drive_url: 'https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view?usp=sharing' },
    { id: '2', title: 'KP 167 Tahun 2023 - Program Keamanan Penerbangan Nasional', kategori: 'Regulasi Dirjen', tanggal: '2023-08-22', ukuran: '5.1 MB', nomor: 'KP 167/2023', versi: '2023', deskripsi: 'Peraturan Direktur Jenderal Perhubungan Udara mengenai standar keamanan nasional.', drive_url: 'https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J1K/view?usp=sharing' },
    { id: '3', title: 'PM 80 Tahun 2017 - Program Keamanan Penerbangan Nasional', kategori: 'Regulasi Dirjen', tanggal: '2017-09-15', ukuran: '4.2 MB', nomor: 'PM 80/2017', versi: '2017', deskripsi: 'Peraturan Menteri Perhubungan tentang pedoman teknis keamanan penerbangan sipil.', drive_url: 'https://drive.google.com/file/d/3C4D5E6F7G8H9I0J1K2L/view?usp=sharing' },
    { id: '4', title: 'Instruksi Kerja Pengoperasian & Kalibrasi Mesin X-Ray Dual View', kategori: 'Instruksi Kerja', tanggal: '2026-02-15', ukuran: '1.2 MB', nomor: 'IK/AVSEC/XR-04', versi: 'v1.0 / 2026', deskripsi: 'Petunjuk langkah kalibrasi Combined Test Piece (CTP) pada unit X-Ray.', drive_url: 'https://drive.google.com/file/d/4D5E6F7G8H9I0J1K2L3M/view?usp=sharing' },
    { id: '5', title: 'Prosedur Penanganan Barang Dilarang (Prohibited Items & Dangerous Goods)', kategori: 'Prosedur', tanggal: '2025-12-01', ukuran: '3.0 MB', nomor: 'SOP/AVSEC-WNP/007/2025', versi: 'v3.0 / 2025', deskripsi: 'Tata cara penyitaan, pencatatan, dan pemusnahan barang berbahaya penumpang.', drive_url: 'https://drive.google.com/file/d/5E6F7G8H9I0J1K2L3M4N/view?usp=sharing' },
    { id: '6', title: 'Prosedur Tanggap Darurat Keamanan Penerbangan (Airport Emergency Plan)', kategori: 'Prosedur', tanggal: '2025-09-14', ukuran: '4.8 MB', nomor: 'AEP/WNP/REV-03', versi: 'Rev-03 / 2025', deskripsi: 'Prosedur evakuasi, pengamanan ancaman bom, dan koordinasi komando darurat.', drive_url: 'https://drive.google.com/file/d/6F7G8H9I0J1K2L3M4N5O/view?usp=sharing' },
    { id: '7', title: 'Persyaratan Kualifikasi & Sertifikasi Lisensi Personel (SKP AVSEC)', kategori: 'SKP/Lisensi Personel', tanggal: '2026-01-05', ukuran: '1.8 MB', nomor: 'SKP/AVSEC-REG/012', versi: '2026', deskripsi: 'Matriks jenjang lisensi Basic, Junior, dan Senior Personel Keamanan Penerbangan.', drive_url: 'https://drive.google.com/file/d/7G8H9I0J1K2L3M4N5O6P/view?usp=sharing' }
  ],
  announcements: [
    { id: '1', title: 'Kalibrasi Rutin Mesin X-Ray', shift: 'Shift Pagi (06:00 - 14:00 WITA)', content: 'Pastikan kalibrasi rutin X-Ray SCP 1 & 2 telah diuji dengan Combined Test Piece (CTP) sebelum flight pertama.', priority: 'Penting', tanggal: 'Hari ini' },
    { id: '2', title: 'Patroli Sisi Udara & Runway', shift: 'Perimeter Security', content: 'Tingkatkan intensitas patroli pagar perimeter sisi runway 07 & 25 antisipasi potensi gangguan hewan ternak.', priority: 'Normal', tanggal: 'Hari ini' },
    { id: '3', title: 'Rapat Koordinasi Keamanan Bandara', shift: 'Semua Personel', content: 'Rapat koordinasi bulanan komite keamanan bandara bersama stakeholder terkait dijadwalkan Jumat jam 09:00 WITA.', priority: 'Normal', tanggal: 'Kemarin' }
  ],
  reports: [
    { id: 'RPT-101', tipe: 'Log Patroli Harian', lokasi: 'Perimeter Sisi Udara (Pagar Selatan)', waktu: '08:30 WITA', pelapor: 'Ahmad Dahlan', status: 'Selesai', ringkasan: 'Kondisi pagar perimeter aman, tidak ditemukan celah atau kerusakan.' },
    { id: 'RPT-102', tipe: 'Pemeriksaan Kendaraan', lokasi: 'Main Gate Access Airside', waktu: '10:15 WITA', pelapor: 'Yohanes Lera', status: 'Selesai', ringkasan: 'Pemeriksaan 1 unit truk catering, izin PAS dan bagasi terverifikasi lengkap.' },
    { id: 'RPT-103', tipe: 'Penemuan Barang Terlarang', lokasi: 'SCP 2 (Screening Penumpang)', waktu: '11:45 WITA', pelapor: 'Siti Aminah', status: 'Ditangani', ringkasan: 'Penyitaan 1 buah powerbank over-capacity (30.000 mAh non-standar), diserahkan ke customer care.' }
  ],
  emergencyContacts: [
    { id: '1', nama: 'Pos Komando AVSEC', kontak: 'Ext. 101', status: '24 Jam Aktif' },
    { id: '2', nama: 'Airport Security Executive', kontak: 'Ext. 102', status: '24 Jam Aktif' },
    { id: '3', nama: 'Tower ATC Wunopito', kontak: 'Freq 122.4 MHz', status: 'Jam Operasional Bandara' },
    { id: '4', nama: 'Polsek Kawasan Bandara', kontak: '0811-3800-991', status: '24 Jam Aktif' }
  ],
  logbookCategories: [
    {
      id: 'access_control',
      title: 'LOGBOOK ACCESS CONTROL',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?embedded=true',
      nativeUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?usp=header',
      sheetsUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing'
    },
    {
      id: 'penyisiran',
      title: 'LOGBOOK PENYISIRAN AVSEC',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?embedded=true',
      nativeUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf6SzR29B857mfaHJlgYKvK-aetjNtAxDy5pv0QHhYdtSnjUw/viewform?usp=header',
      sheetsUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing'
    },
    {
      id: 'patroli',
      title: 'LOGBOOK PATROLI AVSEC',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSdFtY1dkwHyBApwj_rlcUw938139yE9trbaZiY0nJwdCFfO_g/viewform?embedded=true',
      nativeUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdFtY1dkwHyBApwj_rlcUw938139yE9trbaZiY0nJwdCFfO_g/viewform?usp=header',
      sheetsUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing'
    }
  ]
};

function ensureDbFile() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readDb() {
  ensureDbFile();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB:', err);
    return initialData;
  }
}

function writeDb(data) {
  ensureDbFile();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

export { readDb as r, writeDb as w };
