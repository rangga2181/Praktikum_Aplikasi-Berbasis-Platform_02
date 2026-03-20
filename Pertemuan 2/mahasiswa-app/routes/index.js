const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * Routes untuk halaman utama (pages)
 */

// Dashboard
router.get('/', studentController.dashboard);

// Routes untuk mahasiswa
router.get('/students', studentController.index);
router.get('/students/create', studentController.createForm);
router.get('/students/edit/:id', studentController.editForm);

module.exports = router;
