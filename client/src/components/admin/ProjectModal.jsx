import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';

export const ProjectModal = ({ isOpen, onClose, project, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: 'Sector 150, Noida',
    serviceType: 'material_labour',
    areaSqFt: 2500,
    description: '',
    imagesStr: '',
    completionDate: 'Recently Completed',
    isPublished: true,
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        location: project.location || 'Sector 150, Noida',
        serviceType: project.serviceType || 'material_labour',
        areaSqFt: project.areaSqFt || 2500,
        description: project.description || '',
        imagesStr: Array.isArray(project.images) ? project.images.join(', ') : project.images || '',
        completionDate: project.completionDate || 'Recently Completed',
        isPublished: project.isPublished !== undefined ? project.isPublished : true,
      });
    } else {
      setFormData({
        title: '',
        location: 'Sector 150, Noida',
        serviceType: 'material_labour',
        areaSqFt: 2500,
        description: '',
        imagesStr: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        completionDate: 'Recently Completed',
        isPublished: true,
      });
    }
  }, [project, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const images = formData.imagesStr
        .split(',')
        .map((img) => img.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        location: formData.location,
        serviceType: formData.serviceType,
        areaSqFt: Number(formData.areaSqFt),
        description: formData.description,
        images,
        completionDate: formData.completionDate,
        isPublished: formData.isPublished,
      };

      const url = project ? `/api/v1/projects/${project._id}` : '/api/v1/projects';
      const method = project ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast(project ? 'Project updated!' : 'Project published!', 'success');
        onClose();
        if (onRefresh) onRefresh();
      } else {
        showToast(json.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showToast('Error saving project', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Project Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. 3-Story Modern Villa in Sector 150"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Location *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sector 150 Noida"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Contract Type *</label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
            >
              <option value="material_labour">Material + Labour</option>
              <option value="labour_only">Labour Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Area (sq ft) *</label>
            <input
              type="number"
              required
              value={formData.areaSqFt}
              onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Completion Date</label>
            <input
              type="text"
              placeholder="e.g. November 2025"
              value={formData.completionDate}
              onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Image URLs (comma separated)</label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.imagesStr}
            onChange={(e) => setFormData({ ...formData, imagesStr: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Project Description *</label>
          <textarea
            rows="3"
            required
            placeholder="Describe the structural work, RCC foundation specifications, materials used, elevation design..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
          ></textarea>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="pubCheck"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            className="w-4 h-4 rounded text-forest-700 focus:ring-forest-700"
          />
          <label htmlFor="pubCheck" className="text-xs font-bold text-slate-800">
            Publish this project publicly on website portfolio
          </label>
        </div>

        <div className="flex justify-end pt-4 space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-forest-700 text-white rounded-xl text-xs font-bold hover:bg-forest-800 shadow"
          >
            {saving ? 'Saving Project...' : 'Save & Publish Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
