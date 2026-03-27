# Aplikasi Manajemen Data Mahasiswa

Aplikasi web sederhana untuk mengelola data mahasiswa menggunakan **NodeJS + Express + EJS** dengan penyimpanan data berbasis file JSON.

## Link Presentasi

https://drive.google.com/drive/folders/1k8jFUX38OvU31UlLUm3uWTYBq1A3UB9M?usp=sharing

## 🚀 Fitur Aplikasi

- **Dashboard** - Menampilkan statistik dan ringkasan data mahasiswa
- **Input Data** - Form untuk menambah data mahasiswa baru
- **Tabel Data** - Menampilkan semua data mahasiswa dengan DataTables
- **CRUD Lengkap**:
  - ✅ Create - Tambah mahasiswa baru
  - ✅ Read - Lihat data mahasiswa
  - ✅ Update - Edit data mahasiswa (via modal)
  - ✅ Delete - Hapus data mahasiswa dengan konfirmasi

## 📋 Teknologi yang Digunakan

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| NodeJS | 18+ | Runtime environment |
| Express | 4.18+ | Web framework |
| EJS | 3.1+ | Template engine |
| Bootstrap | 5.3+ | CSS framework |
| jQuery | 3.7+ | JavaScript library |
| DataTables | 1.13+ | Tabel interaktif |
| jQuery Validation | 1.21+ | Validasi form |
| SweetAlert2 | 11+ | Alert yang cantik |
| Font Awesome | 6.5+ | Icon library |

## 📁 Struktur Folder

```
mahasiswa-app/
├── app.js                 # File utama aplikasi
├── package.json           # Dependencies project
├── README.md              # Dokumentasi
│
├── controllers/           # Business logic
│   └── studentController.js
│
├── helpers/               # Helper functions
│   └── jsonHelper.js      # Operasi file JSON
│
├── routes/                # Route handlers
│   ├── index.js           # Routes untuk halaman
│   └── api.js             # API endpoints
│
├── views/                 # Template EJS
│   ├── layout.ejs         # Layout utama
│   ├── dashboard.ejs      # Halaman dashboard
│   ├── error.ejs          # Halaman error
│   └── students/
│       ├── form.ejs       # Form input/edit
│       └── index.ejs      # Tabel data
│
├── public/                # Static files
│   ├── css/
│   │   └── style.css      # Custom styles
│   └── js/
│       ├── main.js        # Main JavaScript
│       ├── form-validation.js
│       └── students-table.js
│
└── data/                  # Data storage
    └── students.json      # Data mahasiswa (JSON)
```

## 🔧 Cara Install

1. **Clone atau download project ini**
   ```bash
   cd mahasiswa-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Pastikan file seed data sudah ada**
   - File `data/students.json` sudah berisi 5 data mahasiswa contoh

## ▶️ Cara Menjalankan

### Mode Development (dengan auto-reload)
```bash
npm run dev
```

### Mode Production
```bash
npm start
```

### Akses Aplikasi
Buka browser dan akses: **http://localhost:3000**

## 🌐 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/students` | Mendapatkan semua mahasiswa |
| GET | `/api/students/:id` | Mendapatkan mahasiswa berdasarkan ID |
| POST | `/api/students` | Membuat mahasiswa baru |
| PUT | `/api/students/:id` | Mengupdate mahasiswa |
| DELETE | `/api/students/:id` | Menghapus mahasiswa |

### Contoh Request API

**GET /api/students**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "nim": "2024001",
      "nama": "Ahmad Rizki Pratama",
      "prodi": "Teknik Informatika",
      "angkatan": "2024",
      "email": "ahmad.rizki@student.telkom.ac.id"
    }
  ]
}
```

**POST /api/students**
```json
{
  "nim": "2024006",
  "nama": "John Doe",
  "prodi": "Teknik Informatika",
  "angkatan": "2024",
  "email": "john.doe@student.telkom.ac.id"
}
```

## 📊 Struktur Data Mahasiswa

| Field | Tipe | Deskripsi |
|-------|------|-----------|
| id | String | ID unik (auto-generated) |
| nim | String | Nomor Induk Mahasiswa |
| nama | String | Nama lengkap mahasiswa |
| prodi | String | Program studi |
| angkatan | String | Tahun angkatan |
| email | String | Email mahasiswa |

## 🎨 Halaman Aplikasi

### 1. Dashboard (`/`)
- Menampilkan statistik total mahasiswa
- Grafik distribusi per program studi
- Grafik distribusi per angkatan
- Tabel mahasiswa terbaru

### 2. Input Data (`/students/create`)
- Form input dengan validasi
- Dropdown untuk prodi dan angkatan
- Validasi real-time menggunakan jQuery Validation

### 3. Tabel Data (`/students`)
- DataTables dengan fitur search, sort, pagination
- Tombol Edit (membuka modal)
- Tombol Delete dengan konfirmasi SweetAlert2

## ✨ Keunggulan Aplikasi

1. **UI Modern & Responsif** - Menggunakan Bootstrap 5 dengan custom styling
2. **DataTables Integration** - Tabel interaktif dengan search, sort, pagination
3. **Form Validation** - Validasi lengkap di frontend
4. **SweetAlert2** - Konfirmasi hapus yang user-friendly
5. **JSON Storage** - Penyimpanan sederhana tanpa database
6. **RESTful API** - Endpoint API yang terstruktur
7. **Clean Code** - Struktur MVC yang rapi dan mudah dipahami

## 🔐 Validasi Form

- **NIM**: Wajib diisi, 7-10 karakter, hanya angka
- **Nama**: Wajib diisi, minimal 3 karakter
- **Program Studi**: Wajib dipilih
- **Angkatan**: Wajib dipilih
- **Email**: Wajib diisi, format email valid

## 📝 Seed Data

Aplikasi sudah dilengkapi dengan 5 data mahasiswa contoh:
- Ahmad Rizki Pratama (Teknik Informatika, 2024)
- Siti Nurhaliza (Sistem Informasi, 2024)
- Budi Santoso (Teknik Informatika, 2023)
- Dewi Lestari (Manajemen Informatika, 2023)
- Muhammad Fikri (Teknik Informatika, 2022)

## 🛠️ Troubleshooting

### Port sudah digunakan
Jika port 3000 sudah digunakan, ubah di `app.js`:
```javascript
const PORT = process.env.PORT || 3001; // Ganti ke port lain
```

### Data tidak tersimpan
Pastikan folder `data/` memiliki permission write.

### Module tidak ditemukan
Jalankan ulang:
```bash
npm install
```

## 📄 License

ISC License - Bebas digunakan untuk keperluan pembelajaran.

---

**Dibuat dengan ❤️ untuk Praktikum ABP**
