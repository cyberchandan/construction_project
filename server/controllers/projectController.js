const Project = require('../models/Project');
const { deleteFileFromUploads } = require('../routes/uploadRoutes');

let memoryProjects = [
  {
    _id: 'p_1',
    title: 'Luxury Villa Construction - Sector 150, Noida',
    slug: 'luxury-villa-sector-150-noida',
    location: 'Sector 150, Noida',
    serviceType: 'material_labour',
    areaSqFt: 3600,
    description: '3-Story Premium Residential Villa completed with grade-A RCC structure, high-end stone elevation, thermal insulation, and complete turnkey material + labour execution.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2025-11-20',
    isPublished: true,
  },
  {
    _id: 'p_2',
    title: 'Independent House - Greater Noida West (Noida Ext.)',
    slug: 'independent-house-greater-noida-west',
    location: 'Greater Noida West',
    serviceType: 'labour_only',
    areaSqFt: 2400,
    description: 'Structure and brickwork contract (Labour-only) for a G+2 modern family bungalow. Delivered ahead of schedule adhering to structural design drawings.',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2026-02-15',
    isPublished: true,
  },
  {
    _id: 'p_3',
    title: 'Modern Duplex Residence - Alpha 1, Greater Noida',
    slug: 'modern-duplex-alpha-1-greater-noida',
    location: 'Alpha 1, Greater Noida',
    serviceType: 'material_labour',
    areaSqFt: 4200,
    description: 'Turnkey residential construction featuring earthquake-resistant frame, earthquake foundation engineering, Italian marble flooring, and modular fitting installation.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2026-06-10',
    isPublished: true,
  }
];

// @desc    Get Published Portfolio Projects
// @route   GET /api/v1/projects
// @access  Public
const getPublicProjects = async (req, res, next) => {
  try {
    const { serviceType, location } = req.query;

    let query = { isPublished: true };
    if (serviceType && serviceType !== 'all') query.serviceType = serviceType;
    if (location && location !== 'all') query.location = new RegExp(location, 'i');

    try {
      const projects = await Project.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: projects.length,
        projects,
      });
    } catch (dbErr) {
      let filtered = memoryProjects.filter((p) => p.isPublished);
      if (serviceType && serviceType !== 'all') filtered = filtered.filter((p) => p.serviceType === serviceType);
      return res.status(200).json({
        success: true,
        count: filtered.length,
        projects: filtered,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get Project Detail by Slug
// @route   GET /api/v1/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    let project;
    try {
      project = await Project.findOne({ slug, isPublished: true });
    } catch (dbErr) {
      project = memoryProjects.find((p) => p.slug === slug && p.isPublished);
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or not published.',
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin Create Portfolio Project
// @route   POST /api/v1/projects
// @access  Private (Admin/Staff)
const createProject = async (req, res, next) => {
  try {
    const { title, location, serviceType, areaSqFt, description, images, completionDate, isPublished } = req.body;

    if (!title || !location || !serviceType || !areaSqFt || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, location, serviceType, areaSqFt, and description are required.',
      });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    let newProject;
    try {
      newProject = await Project.create({
        title,
        slug,
        location,
        serviceType,
        areaSqFt: Number(areaSqFt),
        description,
        images: Array.isArray(images) ? images : [images].filter(Boolean),
        featuredImage: Array.isArray(images) && images.length > 0 ? images[0] : '',
        completionDate: completionDate || 'Recently Completed',
        isPublished: isPublished !== undefined ? isPublished : true,
      });
    } catch (dbErr) {
      newProject = {
        _id: 'p_' + Date.now(),
        title,
        slug,
        location,
        serviceType,
        areaSqFt: Number(areaSqFt),
        description,
        images: Array.isArray(images) ? images : [],
        featuredImage: images && images[0] ? images[0] : '',
        completionDate: completionDate || 'Recently Completed',
        isPublished: isPublished !== undefined ? isPublished : true,
      };
      memoryProjects.unshift(newProject);
    }

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: newProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin Update Portfolio Project
// @route   PATCH /api/v1/projects/:id
// @access  Private (Admin/Staff)
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.body.images && Array.isArray(req.body.images) && req.body.images.length > 0) {
      req.body.featuredImage = req.body.images[0];
    }

    // Clean up unlinked / removed photo files from server storage
    let existingProject = null;
    try {
      existingProject = await Project.findById(id);
    } catch (e) {
      existingProject = memoryProjects.find((p) => String(p._id) === String(id));
    }

    if (existingProject && req.body.images && Array.isArray(req.body.images)) {
      const oldImages = Array.isArray(existingProject.images) ? existingProject.images : [];
      const newImages = req.body.images;
      oldImages.forEach((oldUrl) => {
        if (!newImages.includes(oldUrl)) {
          deleteFileFromUploads(oldUrl);
        }
      });
    }

    try {
      const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, message: 'Project updated successfully', project: updated });
    } catch (dbErr) {
      const idx = memoryProjects.findIndex((p) => String(p._id) === String(id));
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });
      memoryProjects[idx] = { ...memoryProjects[idx], ...req.body };
      return res.status(200).json({ success: true, message: 'Project updated successfully', project: memoryProjects[idx] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Admin Delete Portfolio Project
// @route   DELETE /api/v1/projects/:id
// @access  Private (Admin Only)
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete associated upload files from disk
    let targetProject = null;
    try {
      targetProject = await Project.findById(id);
    } catch (e) {
      targetProject = memoryProjects.find((p) => String(p._id) === String(id));
    }

    if (targetProject) {
      const imagesToDelete = [];
      if (Array.isArray(targetProject.images)) {
        imagesToDelete.push(...targetProject.images);
      }
      if (targetProject.featuredImage) {
        imagesToDelete.push(targetProject.featuredImage);
      }

      imagesToDelete.forEach((imgUrl) => {
        deleteFileFromUploads(imgUrl);
      });
    }

    try {
      await Project.findByIdAndDelete(id);
    } catch (dbErr) {
      memoryProjects = memoryProjects.filter((p) => String(p._id) !== String(id));
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully and associated photos removed from disk',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
