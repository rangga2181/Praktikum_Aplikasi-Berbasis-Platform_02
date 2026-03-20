const express = require('express');
const path = require('path');

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware untuk parsing JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS sebagai template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoutes);
app.use('/api/students', apiRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        title: '404 - Page Not Found',
        message: 'Halaman yang Anda cari tidak ditemukan',
        error: { status: 404 }
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: '500 - Server Error',
        message: 'Terjadi kesalahan pada server',
        error: { status: 500 }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   Aplikasi Manajemen Data Mahasiswa                    ║
║   Server berjalan di: http://localhost:${PORT}            ║
╚════════════════════════════════════════════════════════╝
    `);
});
