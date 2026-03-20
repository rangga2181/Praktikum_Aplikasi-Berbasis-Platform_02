# 📝 Script Presentasi
## Aplikasi Manajemen Data Mahasiswa

---

## 🎯 Pembukaan (1-2 menit)

**Assalamu'alaikum Wr. Wb. / Selamat Pagi**

Perkenalkan, saya [Nama Anda]. Pada kesempatan kali ini, saya akan mempresentasikan project yang telah saya buat, yaitu **"Aplikasi Manajemen Data Mahasiswa"** menggunakan NodeJS, Express, dan EJS dengan penyimpanan data berbasis file JSON.

Aplikasi ini dibuat untuk memenuhi tugas Praktikum ABP Pertemuan 2 dengan fitur CRUD lengkap dan tampilan yang modern menggunakan Bootstrap 5.

---

## 📁 1. Struktur Folder Project

**File yang ditunjukkan:** `README.md` (baris 23-52)

```
mahasiswa-app/
├── app.js                    # File utama server
├── package.json              # Dependencies
├── README.md                 # Dokumentasi
│
├── controllers/              # Business Logic
│   └── studentController.js
│
├── helpers/                  # Helper Functions
│   └── jsonHelper.js
│
├── routes/                   # Route Handlers
│   ├── index.js              # Routes halaman
│   └── api.js                # API endpoints
│
├── views/                    # Template EJS
│   ├── layout.ejs            # Layout utama
│   ├── dashboard.ejs         # Halaman dashboard
│   ├── error.ejs             # Halaman error
│   └── students/
│       ├── form.ejs          # Form input/edit
│       └── index.ejs         # Tabel data
│
├── public/                   # Static Files
│   ├── css/style.css
│   └── js/
│       ├── main.js
│       ├── form-validation.js
│       └── students-table.js
│
└── data/                     # Data Storage
    └── students.json
```

**Penjelasan:**
> "Project ini menggunakan struktur folder yang rapi dengan pola MVC (Model-View-Controller). Setiap folder memiliki tanggung jawab tersendiri:
> - **controllers** untuk business logic
> - **helpers** untuk fungsi bantu
> - **routes** untuk routing URL
> - **views** untuk template halaman
> - **public** untuk file statis seperti CSS dan JavaScript
> - **data** untuk penyimpanan JSON"

---

## ⚙️ 2. File Utama Server

**File yang ditunjukkan:** `app.js`

**Baris penting:**
- **Line 1-7**: Import dependencies dan routes
- **Line 9-11**: Setup Express dan PORT
- **Line 14-17**: Middleware untuk parsing JSON
- **Line 20-22**: Setup EJS template engine
- **Line 25**: Static files
- **Line 28-29**: Routes
- **Line 32-43**: Error handling
- **Line 46-52**: Start server

```javascript
// app.js - Line 1-7
const express = require('express');
const path = require('path');

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;
```

**Penjelasan:**
> "File `app.js` adalah entry point aplikasi. Di sini kita setup Express, middleware, template engine EJS, dan routing. Server berjalan di port 3001."

---

## 🔧 3. Helper Function (JSON Storage)

**File yang ditunjukkan:** `helpers/jsonHelper.js`

**Baris penting:**
- **Line 1-6**: Import fs dan path, setup data path
- **Line 8-20**: `getAllStudents()` - Baca semua data
- **Line 22-31**: `getStudentById()` - Cari berdasarkan ID
- **Line 33-46**: `saveAllStudents()` - Simpan semua data
- **Line 48-64**: `createStudent()` - Tambah data baru
- **Line 66-85**: `updateStudent()` - Update data
- **Line 87-100**: `deleteStudent()` - Hapus data

```javascript
// helpers/jsonHelper.js - Line 48-64
const createStudent = (studentData) => {
    const students = getAllStudents();
    
    // Generate unique ID
    const maxId = students.reduce((max, s) => Math.max(max, parseInt(s.id) || 0), 0);
    const newStudent = {
        id: String(maxId + 1),
        ...studentData
    };
    
    students.push(newStudent);
    saveAllStudents(students);
    return newStudent;
};
```

**Penjelasan:**
> "Helper ini menggantikan fungsi database. Semua operasi CRUD dilakukan melalui file JSON. ID di-generate otomatis berdasarkan ID terbesar + 1."

---

## 🎮 4. Controller (Business Logic)

**File yang ditunjukkan:** `controllers/studentController.js`

**Baris penting:**
- **Line 8-32**: `dashboard()` - Render halaman dashboard dengan statistik
- **Line 35-42**: `createForm()` - Render form tambah data
- **Line 45-52**: `index()` - Render tabel data
- **Line 55-64**: `editForm()` - Render form edit
- **Line 68-74**: `apiGetAll()` - API ambil semua data
- **Line 77-88**: `apiGetById()` - API ambil data by ID
- **Line 91-114**: `apiCreate()` - API tambah data
- **Line 117-148**: `apiUpdate()` - API update data
- **Line 151-168**: `apiDelete()` - API hapus data

```javascript
// controllers/studentController.js - Line 91-114
apiCreate: (req, res) => {
    const { nim, nama, prodi, angkatan, email } = req.body;
    
    // Validasi input
    if (!nim || !nama || !prodi || !angkatan || !email) {
        return res.status(400).json({
            success: false,
            message: 'Semua field wajib diisi'
        });
    }
    
    const newStudent = jsonHelper.createStudent({
        nim, nama, prodi, angkatan, email
    });
    
    res.status(201).json({
        success: true,
        message: 'Mahasiswa berhasil ditambahkan',
        data: newStudent
    });
},
```

**Penjelasan:**
> "Controller memisahkan business logic dari routes. Setiap fungsi menangani satu operasi dan mengembalikan response JSON atau render view."

---

## 🛣️ 5. Routes (URL Routing)

**File yang ditunjukkan:** `routes/index.js` dan `routes/api.js`

### routes/index.js
```javascript
// routes/index.js
router.get('/', studentController.dashboard);
router.get('/students', studentController.index);
router.get('/students/create', studentController.createForm);
router.get('/students/edit/:id', studentController.editForm);
```

### routes/api.js
```javascript
// routes/api.js
router.get('/', studentController.apiGetAll);
router.get('/:id', studentController.apiGetById);
router.post('/', studentController.apiCreate);
router.put('/:id', studentController.apiUpdate);
router.delete('/:id', studentController.apiDelete);
```

**Penjelasan:**
> "Routes menghubungkan URL dengan controller function. Ada 2 jenis routes:
> - **Page routes** untuk render halaman
> - **API routes** untuk operasi CRUD via AJAX"

---

## 🎨 6. Views (Template EJS)

**File yang ditunjukkan:** `views/layout.ejs`, `views/dashboard.ejs`, `views/students/index.ejs`, `views/students/form.ejs`

### layout.ejs (Base Template)
**Baris penting:**
- **Line 1-19**: HTML head dengan CDN Bootstrap, DataTables, FontAwesome
- **Line 21-46**: Navbar
- **Line 49-51**: Main content
- **Line 54-60**: Footer
- **Line 63-77**: Scripts CDN

### dashboard.ejs
**Fitur:**
- 3 Cards statistik (Total Mahasiswa, Prodi, Angkatan)
- List distribusi per Prodi
- List distribusi per Angkatan
- Tabel mahasiswa terbaru

### students/index.ejs
**Fitur:**
- DataTables untuk tabel interaktif
- Modal Bootstrap untuk edit
- Tombol Edit dan Delete

### students/form.ejs
**Fitur:**
- Form input dengan validasi
- Dropdown prodi dan angkatan
- Tombol Batal, Reset, Simpan

**Penjelasan:**
> "EJS memungkinkan kita membuat template dinamis. Layout.ejs sebagai base template yang di-include di setiap halaman."

---

## 💻 7. JavaScript Frontend

**File yang ditunjukkan:** `public/js/form-validation.js` dan `public/js/students-table.js`

### form-validation.js
**Baris penting:**
- **Line 7-56**: jQuery Validation rules
- **Line 58-67**: Error placement
- **Line 69-96**: Submit handler dengan AJAX

```javascript
// public/js/form-validation.js - Line 7-30
$('#studentForm').validate({
    rules: {
        nim: {
            required: true,
            minlength: 7,
            maxlength: 10,
            number: true
        },
        nama: {
            required: true,
            minlength: 3,
            maxlength: 100
        },
        // ... field lainnya
    },
    messages: {
        nim: {
            required: 'NIM wajib diisi',
            minlength: 'NIM minimal 7 karakter'
        }
    }
});
```

### students-table.js
**Baris penting:**
- **Line 7-55**: DataTables initialization dengan AJAX
- **Line 58-80**: Edit button handler
- **Line 83-120**: Save edit handler
- **Line 123-155**: Delete button handler dengan SweetAlert2

```javascript
// public/js/students-table.js - Line 123-155
$(document).on('click', '.btn-delete', function() {
    const id = $(this).data('id');
    
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/api/students/${id}`,
                method: 'DELETE',
                success: function(response) {
                    Swal.fire('Berhasil!', response.message, 'success');
                    studentsTable.ajax.reload();
                }
            });
        }
    });
});
```

**Penjelasan:**
> "JavaScript frontend menangani:
> - Validasi form real-time
> - DataTables untuk tabel interaktif
> - AJAX untuk CRUD tanpa reload
> - SweetAlert2 untuk konfirmasi"

---

## 🎯 8. Demo Aplikasi

**Urutan Demo:**

1. **Dashboard** (`http://localhost:3001`)
   - Tunjukkan 3 cards statistik
   - Tunjukkan grafik prodi dan angkatan
   - Tunjukkan tabel mahasiswa terbaru

2. **Input Data** (Klik "Tambah Mahasiswa")
   - Isi form dengan data baru
   - Tunjukkan validasi form (kosongkan field untuk trigger error)
   - Submit dan tunjukkan alert sukses

3. **Tabel Data** (Klik "Tabel Data")
   - Tunjukkan DataTables dengan search, sort, pagination
   - Demo search "Ahmad"
   - Demo sort berdasarkan kolom

4. **Edit Data** (Klik tombol Edit)
   - Klik Edit pada salah satu data
   - Tunjukkan modal dengan data ter-load
   - Ubah data dan save
   - Tunjukkan alert sukses dan tabel reload

5. **Delete Data** (Klik tombol Hapus)
   - Klik Hapus pada salah satu data
   - Tunjukkan konfirmasi SweetAlert2
   - Konfirmasi hapus
   - Tunjukkan alert sukses dan tabel reload

---

## 📊 9. API Testing (Opsional)

**Endpoint yang bisa ditunjukkan:**

```
GET  http://localhost:3001/api/students
GET  http://localhost:3001/api/students/1
POST http://localhost:3001/api/students
PUT  http://localhost:3001/api/students/1
DELETE http://localhost:3001/api/students/1
```

**Penjelasan:**
> "Semua operasi CRUD bisa diakses via API dengan response JSON. Ini memungkinkan integrasi dengan frontend lain atau mobile app."

---

## 🔐 10. Validasi dan Keamanan

**Validasi Frontend:**
- NIM: 7-10 karakter, angka saja
- Nama: minimal 3 karakter
- Email: format email valid
- Prodi & Angkatan: wajib dipilih

**Validasi Backend:**
- Semua field wajib diisi
- Response error dengan message jelas

---

## ✨ 11. Keunggulan Aplikasi

1. ✅ **UI Modern & Responsif** - Bootstrap 5 dengan custom styling
2. ✅ **DataTables Integration** - Search, sort, pagination otomatis
3. ✅ **Form Validation** - Real-time validation
4. ✅ **SweetAlert2** - Konfirmasi hapus user-friendly
5. ✅ **JSON Storage** - Tanpa database, mudah deploy
6. ✅ **RESTful API** - Endpoint terstruktur
7. ✅ **Clean Code** - Struktur MVC rapi

---

## 🎬 12. Penutup

**Kesimpulan:**
> "Aplikasi Manajemen Data Mahasiswa ini telah memenuhi semua requirements:
> - 3 halaman utama (Dashboard, Input, Tabel)
> - CRUD lengkap (Create, Read, Update, Delete)
> - DataTables untuk tabel
> - jQuery Validation untuk form
> - SweetAlert2 untuk konfirmasi
> - Penyimpanan JSON tanpa database
> - UI bersih dan responsif"

**Terima kasih. Wassalamu'alaikum Wr. Wb.**

---

## 📋 Checklist File untuk Presentasi

| No | File | Keterangan |
|----|------|------------|
| 1 | `README.md` | Struktur folder & dokumentasi |
| 2 | `app.js` | Main server |
| 3 | `helpers/jsonHelper.js` | JSON operations |
| 4 | `controllers/studentController.js` | Business logic |
| 5 | `routes/index.js` | Page routes |
| 6 | `routes/api.js` | API routes |
| 7 | `views/layout.ejs` | Base template |
| 8 | `views/dashboard.ejs` | Dashboard page |
| 9 | `views/students/index.ejs` | Table page |
| 10 | `views/students/form.ejs` | Form page |
| 11 | `public/js/form-validation.js` | Form validation |
| 12 | `public/js/students-table.js` | DataTables logic |
| 13 | `data/students.json` | Seed data |
| 14 | `public/css/style.css` | Custom styles |

---

## ⏱️ Estimasi Waktu Presentasi

| Bagian | Waktu |
|--------|-------|
| Pembukaan | 1 menit |
| Struktur Folder | 2 menit |
| Penjelasan Code | 5 menit |
| Demo Aplikasi | 5 menit |
| Tanya Jawab | 2 menit |
| **Total** | **15 menit** |

---

## 💡 Tips Presentasi

1. **Buka aplikasi di browser** sebelum presentasi
2. **Siapkan beberapa data** untuk demo edit/delete
3. **Highlight kode penting** saat menjelaskan
4. **Jangan lupa scroll** saat menunjukkan code
5. **Test semua fitur** sebelum presentasi
6. **Siapkan jawaban** untuk pertanyaan umum:
   - "Kenapa pakai JSON bukan database?"
   - "Bagaimana kalau data banyak?"
   - "Apa keunggulan EJS?"
