import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ProjectModal } from '../../components/admin/ProjectModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Plus, Edit, Trash2, MapPin, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const AdminProjectsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();
  const { user } = useAuth();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio project?')) return;
    try {
      const res = await fetch(`/api/v1/projects/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Project deleted successfully', 'success');
        fetchProjects();
      } else {
        showToast(json.message || 'Failed to delete', 'error');
      }
    } catch (err) {
      showToast('Error deleting project', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader title="Portfolio Project Management" onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold font-display text-forest-900">
                Completed & Ongoing Projects
              </h3>
              <p className="text-xs text-slate-500">
                Manage completed construction showcase items on public website gallery.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedProject(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2.5 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-sage-300" />
              <span>Add New Project</span>
            </button>
          </div>

          {loading ? (
            <LoadingSpinner label="Loading portfolio projects..." />
          ) : projects.length === 0 ? (
            <EmptyState title="No projects uploaded yet" description="Click 'Add New Project' above to showcase your completed house construction work." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div key={p._id} className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative h-48">
                      <img
                        src={p.featuredImage || p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.isPublished ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'}`}>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center space-x-1 text-xs font-semibold text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-forest-700" />
                        <span>{p.location}</span>
                      </div>
                      <h4 className="font-bold text-sm text-forest-900 font-display leading-snug">{p.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 font-bold">{p.areaSqFt} sq ft</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProject(p);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center space-x-1"
                      >
                        <Edit className="w-3.5 h-3.5 text-forest-700" />
                        <span>Edit</span>
                      </button>

                      {user?.role === 'admin' && (
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchProjects}
      />
    </div>
  );
};
