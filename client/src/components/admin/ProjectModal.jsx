import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { Upload, X, Star, Loader2, ImagePlus } from 'lucide-react';

export const ProjectModal = ({ isOpen, onClose, project, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: 'Sector 150, Noida',
    serviceType: 'material_labour',
    areaSqFt: 2500,
    description: '',
    images: [],
    imagesStr: '',
    completionDate: 'Recently Completed',
    isPublished: true,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (project) {
        let imgArr = [];
        if (Array.isArray(project.images) && project.images.length > 0) {
          imgArr = [...project.images];
        } else if (project.featuredImage) {
          imgArr = [project.featuredImage];
        } else if (typeof project.images === 'string' && project.images.trim()) {
          imgArr = project.images.split(',').map((s) => s.trim()).filter(Boolean);
        }

        // If featuredImage exists and is not at index 0, place it first
        if (project.featuredImage && imgArr.includes(project.featuredImage)) {
          imgArr = [project.featuredImage, ...imgArr.filter((i) => i !== project.featuredImage)];
        }

        setFormData({
          title: project.title || '',
          location: project.location || 'Sector 150, Noida',
          serviceType: project.serviceType || 'material_labour',
          areaSqFt: project.areaSqFt || 2500,
          description: project.description || '',
          images: imgArr,
          imagesStr: imgArr.join(', '),
          completionDate: project.completionDate || 'Recently Completed',
          isPublished: project.isPublished !== undefined ? project.isPublished : true,
        });
      } else {
        const defaultImg = [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        ];
        setFormData({
          title: '',
          location: 'Sector 150, Noida',
          serviceType: 'material_labour',
          areaSqFt: 2500,
          description: '',
          images: defaultImg,
          imagesStr: defaultImg.join(', '),
          completionDate: 'Recently Completed',
          isPublished: true,
        });
      }
    }
  }, [project, isOpen]);

  // Upload local file from system
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    let uploadedUrls = [];

    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          showToast(`File "${file.name}" is not an image`, 'error');
          continue;
        }

        // Read file as base64 Data URL
        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });

        // Send to upload server route
        const res = await fetch('/api/v1/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data, name: file.name }),
        });

        const data = await res.json();
        if (res.ok && data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          uploadedUrls.push(base64Data);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          const updated = [...uploadedUrls, ...prev.images]; // Add newly uploaded image at top (cover)
          return {
            ...prev,
            images: updated,
            imagesStr: updated.join(', '),
          };
        });
        showToast(`Uploaded ${uploadedUrls.length} new photo(s) from system!`, 'success');
      }
    } catch (err) {
      console.error('File upload error:', err);
      showToast('Error uploading file from system', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleMakeCoverPhoto = (indexToCover) => {
    setFormData((prev) => {
      const targetImg = prev.images[indexToCover];
      const remaining = prev.images.filter((_, idx) => idx !== indexToCover);
      const updated = [targetImg, ...remaining];
      return {
        ...prev,
        images: updated,
        imagesStr: updated.join(', '),
      };
    });
    showToast('Updated main cover photo', 'info');
  };

  const handleRemoveImage = async (indexToRemove) => {
    const targetUrl = formData.images[indexToRemove];

    // Immediately request server disk unlinking if it's an uploaded file
    if (targetUrl && targetUrl.includes('/uploads/')) {
      try {
        await fetch('/api/v1/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl }),
        });
      } catch (err) {
        console.warn('Failed to delete upload file from server:', err);
      }
    }

    setFormData((prev) => {
      const updated = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated,
        imagesStr: updated.join(', '),
      };
    });
    showToast('Photo removed from project', 'info');
  };

  const handleManualUrlChange = (val) => {
    const arr = val.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      imagesStr: val,
      images: arr,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const images = formData.images;

      if (images.length === 0) {
        showToast('Please upload or provide at least 1 project photo', 'error');
        setSaving(false);
        return;
      }

      const payload = {
        title: formData.title,
        location: formData.location,
        serviceType: formData.serviceType,
        areaSqFt: Number(formData.areaSqFt),
        description: formData.description,
        images: images,
        featuredImage: images[0], // First image is main cover photo
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
        showToast(project ? 'Project updated successfully!' : 'Project published successfully!', 'success');
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

        {/* SYSTEM FILE UPLOAD & IMAGE MANAGEMENT SECTION */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <label className="block font-bold text-slate-800 uppercase text-xs">
              Project Photos & Cover Image
            </label>
            <span className="text-[11px] font-bold text-slate-500">
              {formData.images.length} photo(s) attached
            </span>
          </div>

          {/* Upload Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="flex-1 cursor-pointer bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-[#88BDF2] hover:border-[#6A89A7] rounded-xl p-3 flex items-center justify-center space-x-2 transition shadow-xs text-center">
              {uploading ? (
                <div className="flex items-center space-x-2 text-[#384959] font-bold">
                  <Loader2 className="w-4 h-4 animate-spin text-[#88BDF2]" />
                  <span>Uploading photo from computer...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-[#384959] font-bold">
                  <ImagePlus className="w-4.5 h-4.5 text-[#88BDF2]" />
                  <span>Upload / Replace Photo from System</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                disabled={uploading}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Previews & Cover Selection Grid */}
          {formData.images.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                Photos Preview (First image is Cover Photo):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                {formData.images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden border-2 aspect-video bg-slate-300 group shadow-xs ${
                      idx === 0 ? 'border-amber-400 ring-2 ring-amber-300/50' : 'border-slate-300'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Project photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Badge for Cover Photo */}
                    {idx === 0 ? (
                      <span className="absolute top-1 left-1 bg-amber-400 text-[#384959] text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                        ★ Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMakeCoverPhoto(idx)}
                        className="absolute top-1 left-1 bg-[#384959]/90 hover:bg-[#384959] text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded shadow opacity-90 hover:opacity-100 transition flex items-center space-x-0.5"
                        title="Set as Main Cover Photo"
                      >
                        <Star className="w-2.5 h-2.5 fill-amber-300" />
                        <span>Make Cover</span>
                      </button>
                    )}

                    {/* Delete Photo Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow transition"
                      title="Remove this photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual URL Input Fallback */}
          <div>
            <details className="text-slate-500 text-[11px] cursor-pointer">
              <summary className="font-bold text-[#384959] hover:underline">
                Or edit Image URLs manually (comma separated)
              </summary>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imagesStr}
                onChange={(e) => handleManualUrlChange(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-800"
              />
            </details>
          </div>
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
            className="w-4 h-4 rounded text-[#384959] focus:ring-[#88BDF2]"
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
            disabled={saving || uploading}
            className="px-5 py-2 bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white rounded-xl text-xs font-bold shadow transition"
          >
            {saving ? 'Saving Project...' : 'Save & Publish Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
