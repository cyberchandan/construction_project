const express = require('express');
const router = express.Router();
const {
  getPublicProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public project gallery routes
router.get('/', getPublicProjects);
router.get('/:slug', getProjectBySlug);

// Admin portfolio project CRUD
router.post('/', protect, createProject);
router.patch('/:id', protect, updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

module.exports = router;
