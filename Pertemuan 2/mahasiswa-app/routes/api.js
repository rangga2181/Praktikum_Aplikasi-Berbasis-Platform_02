const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * API Routes untuk CRUD Mahasiswa
 * Base path: /api/students
 */

// GET /api/students - Mendapatkan semua mahasiswa
router.get('/', studentController.apiGetAll);

// GET /api/students/:id - Mendapatkan mahasiswa berdasarkan ID
router.get('/:id', studentController.apiGetById);

// POST /api/students - Membuat mahasiswa baru
router.post('/', studentController.apiCreate);

// PUT /api/students/:id - Mengupdate mahasiswa
router.put('/:id', studentController.apiUpdate);

// DELETE /api/students/:id - Menghapus mahasiswa
router.delete('/:id', studentController.apiDelete);

module.exports = router;
