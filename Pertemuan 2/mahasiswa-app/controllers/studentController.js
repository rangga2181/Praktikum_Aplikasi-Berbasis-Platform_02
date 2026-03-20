const jsonHelper = require('../helpers/jsonHelper');

/**
 * Controller untuk mengelola data mahasiswa
 */
const studentController = {
    /**
     * Menampilkan halaman dashboard
     */
    dashboard: (req, res) => {
        const students = jsonHelper.getAllStudents();
        const totalStudents = students.length;
        
        // Hitung statistik per prodi
        const prodiStats = {};
        students.forEach(student => {
            prodiStats[student.prodi] = (prodiStats[student.prodi] || 0) + 1;
        });
        
        // Hitung statistik per angkatan
        const angkatanStats = {};
        students.forEach(student => {
            angkatanStats[student.angkatan] = (angkatanStats[student.angkatan] || 0) + 1;
        });
        
        res.render('dashboard', {
            title: 'Dashboard',
            totalStudents,
            prodiStats,
            angkatanStats,
            recentStudents: students.slice(-5).reverse()
        });
    },

    /**
     * Menampilkan halaman form input data
     */
    createForm: (req, res) => {
        res.render('students/form', {
            title: 'Tambah Mahasiswa',
            student: null,
            isEdit: false
        });
    },

    /**
     * Menampilkan halaman tabel data
     */
    index: (req, res) => {
        const students = jsonHelper.getAllStudents();
        res.render('students/index', {
            title: 'Data Mahasiswa',
            students
        });
    },

    /**
     * Menampilkan halaman edit form
     */
    editForm: (req, res) => {
        const student = jsonHelper.getStudentById(req.params.id);
        if (!student) {
            return res.redirect('/students');
        }
        res.render('students/form', {
            title: 'Edit Mahasiswa',
            student,
            isEdit: true
        });
    },

    // API Methods
    /**
     * GET /api/students - Mendapatkan semua mahasiswa
     */
    apiGetAll: (req, res) => {
        const students = jsonHelper.getAllStudents();
        res.json({
            success: true,
            data: students
        });
    },

    /**
     * GET /api/students/:id - Mendapatkan mahasiswa berdasarkan ID
     */
    apiGetById: (req, res) => {
        const student = jsonHelper.getStudentById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Mahasiswa tidak ditemukan'
            });
        }
        res.json({
            success: true,
            data: student
        });
    },

    /**
     * POST /api/students - Membuat mahasiswa baru
     */
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
            nim,
            nama,
            prodi,
            angkatan,
            email
        });
        
        res.status(201).json({
            success: true,
            message: 'Mahasiswa berhasil ditambahkan',
            data: newStudent
        });
    },

    /**
     * PUT /api/students/:id - Mengupdate mahasiswa
     */
    apiUpdate: (req, res) => {
        const { nim, nama, prodi, angkatan, email } = req.body;
        
        // Validasi input
        if (!nim || !nama || !prodi || !angkatan || !email) {
            return res.status(400).json({
                success: false,
                message: 'Semua field wajib diisi'
            });
        }
        
        const updatedStudent = jsonHelper.updateStudent(req.params.id, {
            nim,
            nama,
            prodi,
            angkatan,
            email
        });
        
        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Mahasiswa tidak ditemukan'
            });
        }
        
        res.json({
            success: true,
            message: 'Mahasiswa berhasil diupdate',
            data: updatedStudent
        });
    },

    /**
     * DELETE /api/students/:id - Menghapus mahasiswa
     */
    apiDelete: (req, res) => {
        const success = jsonHelper.deleteStudent(req.params.id);
        
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Mahasiswa tidak ditemukan'
            });
        }
        
        res.json({
            success: true,
            message: 'Mahasiswa berhasil dihapus'
        });
    }
};

module.exports = studentController;
