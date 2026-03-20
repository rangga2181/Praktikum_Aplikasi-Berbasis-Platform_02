const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'students.json');

/**
 * Membaca semua data mahasiswa dari file JSON
 * @returns {Array} Array of students
 */
const getAllStudents = () => {
    try {
        if (!fs.existsSync(dataPath)) {
            return [];
        }
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading students:', error);
        return [];
    }
};

/**
 * Mendapatkan mahasiswa berdasarkan ID
 * @param {string} id - Student ID
 * @returns {Object|null} Student object or null
 */
const getStudentById = (id) => {
    const students = getAllStudents();
    return students.find(student => student.id === id) || null;
};

/**
 * Menyimpan semua data mahasiswa ke file JSON
 * @param {Array} students - Array of students
 * @returns {boolean} Success status
 */
const saveAllStudents = (students) => {
    try {
        const dir = path.dirname(dataPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dataPath, JSON.stringify(students, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving students:', error);
        return false;
    }
};

/**
 * Menambah mahasiswa baru
 * @param {Object} studentData - Student data
 * @returns {Object} Created student
 */
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

/**
 * Mengupdate data mahasiswa
 * @param {string} id - Student ID
 * @param {Object} studentData - Updated student data
 * @returns {Object|null} Updated student or null
 */
const updateStudent = (id, studentData) => {
    const students = getAllStudents();
    const index = students.findIndex(student => student.id === id);
    
    if (index === -1) {
        return null;
    }
    
    students[index] = {
        ...students[index],
        ...studentData,
        id: id // Keep original ID
    };
    
    saveAllStudents(students);
    return students[index];
};

/**
 * Menghapus mahasiswa berdasarkan ID
 * @param {string} id - Student ID
 * @returns {boolean} Success status
 */
const deleteStudent = (id) => {
    const students = getAllStudents();
    const filteredStudents = students.filter(student => student.id !== id);
    
    if (filteredStudents.length === students.length) {
        return false; // Student not found
    }
    
    return saveAllStudents(filteredStudents);
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    saveAllStudents
};
