/**
 * HOSPITAL VISITS PAGE COMPONENT
 * ================================
 * Lets users log and track hospital / clinic visits for themselves or their baby
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HospitalVisitsHeader from '../components/HospitalVisitsHeader';
import HospitalVisitCard from '../components/HospitalVisitCard';
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from '../context/ToastContext';
import { useBabyContext } from '../context/BabyContext';
import {
  getHospitalVisits,
  createHospitalVisit,
  updateHospitalVisit,
  deleteHospitalVisit,
} from '../api';
import '../styles/Vaccines.css';
import '../styles/HospitalVisits.css';

const emptyForm = {
  visit_for: 'mother',
  baby_id: '',
  hospital_name: '',
  doctor_name: '',
  reason: '',
  visit_date: '',
  follow_up_date: '',
  notes: '',
  status: 'completed',
};

export default function HospitalVisits() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { babies, selectedBaby } = useBabyContext();

  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        const data = await getHospitalVisits();
        setVisits(data || []);
      } catch (error) {
        console.error('Error fetching hospital visits:', error);
        addToast('Could not load hospital visits', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredVisits = useMemo(() => {
    if (activeTab === 'upcoming') return visits.filter((v) => v.status === 'upcoming');
    if (activeTab === 'completed') return visits.filter((v) => v.status === 'completed');
    return visits;
  }, [visits, activeTab]);

  const stats = useMemo(
    () => ({
      total: visits.length,
      completed: visits.filter((v) => v.status === 'completed').length,
      upcoming: visits.filter((v) => v.status === 'upcoming').length,
    }),
    [visits]
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      baby_id: selectedBaby?.id || '',
      visit_for: selectedBaby ? 'baby' : 'mother',
    });
    setShowModal(true);
  };

  const openEditModal = (visit) => {
    setEditingId(visit.id);
    setForm({
      visit_for: visit.visit_for || 'mother',
      baby_id: visit.baby_id || '',
      hospital_name: visit.hospital_name || '',
      doctor_name: visit.doctor_name || '',
      reason: visit.reason || '',
      visit_date: visit.visit_date || '',
      follow_up_date: visit.follow_up_date || '',
      notes: visit.notes || '',
      status: visit.status || 'completed',
    });
    setShowModal(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.hospital_name || !form.visit_date) {
      addToast('Hospital name and visit date are required', 'error');
      return;
    }

    const payload = {
      ...form,
      baby_id: form.visit_for === 'baby' ? form.baby_id || null : null,
    };

    try {
      if (editingId) {
        const updated = await updateHospitalVisit(editingId, payload);
        setVisits((prev) => prev.map((v) => (v.id === editingId ? updated : v)));
        addToast('Visit updated successfully', 'success');
      } else {
        const created = await createHospitalVisit(payload);
        setVisits((prev) => [created, ...prev]);
        addToast('Visit logged successfully', 'success');
      }
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving hospital visit:', error);
      addToast('Failed to save hospital visit', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHospitalVisit(id);
      setVisits((prev) => prev.filter((v) => v.id !== id));
      addToast('Visit deleted', 'success');
    } catch (error) {
      console.error('Error deleting hospital visit:', error);
      addToast('Failed to delete visit', 'error');
    }
  };

  if (loading) {
    return (
      <div className="vaccines-container hospital-container">
        <HospitalVisitsHeader onBack={() => navigate(-1)} onAddVisit={openAddModal} />
        <div className="vaccines-main" style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading hospital visits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vaccines-container hospital-container">
      <HospitalVisitsHeader onBack={() => navigate(-1)} onAddVisit={openAddModal} />

      <div className="vaccines-main">
        {/* Stats */}
        <div className="vaccine-stats">
          <div className="vaccine-stat-card">
            <p className="vaccine-stat-number hospital-accent">{stats.total}</p>
            <p className="vaccine-stat-label">Total Visits</p>
          </div>
          <div className="vaccine-stat-card">
            <p className="vaccine-stat-number hospital-accent">✓</p>
            <p className="vaccine-stat-label">{stats.completed} Completed</p>
          </div>
          <div className="vaccine-stat-card">
            <p className="vaccine-stat-number hospital-accent">⏰</p>
            <p className="vaccine-stat-label">{stats.upcoming} Upcoming</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="vaccine-tabs">
          <button
            className={`vaccine-tab-btn ${activeTab === 'all' ? 'active hospital-tab-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Visits
          </button>
          <button
            className={`vaccine-tab-btn ${activeTab === 'upcoming' ? 'active hospital-tab-active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            ⏰ Upcoming
          </button>
          <button
            className={`vaccine-tab-btn ${activeTab === 'completed' ? 'active hospital-tab-active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            ✓ Completed
          </button>
        </div>

        {/* List */}
        <div className="vaccine-cards-list">
          {filteredVisits.length > 0 ? (
            filteredVisits.map((visit) => {
              const baby = babies?.find((b) => b.id === visit.baby_id);
              return (
                <HospitalVisitCard
                  key={visit.id}
                  hospitalName={visit.hospital_name}
                  doctorName={visit.doctor_name}
                  reason={visit.reason}
                  visitDate={visit.visit_date}
                  followUpDate={visit.follow_up_date}
                  notes={visit.notes}
                  status={visit.status}
                  visitFor={visit.visit_for}
                  babyName={baby?.name}
                  onEdit={() => openEditModal(visit)}
                  onDelete={() => handleDelete(visit.id)}
                />
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
              <p>No hospital visits logged yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowModal(false)} />
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingId ? 'Edit Visit' : 'Log Hospital Visit'}</h2>
                <button className="modal-close-button" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>
              <form className="modal-body" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="visit_for">Visit For</label>
                  <select
                    id="visit_for"
                    value={form.visit_for}
                    onChange={(e) => handleChange('visit_for', e.target.value)}
                  >
                    <option value="mother">Mother</option>
                    <option value="baby">Baby</option>
                  </select>
                </div>

                {form.visit_for === 'baby' && babies && babies.length > 0 && (
                  <div className="form-group">
                    <label htmlFor="baby_id">Baby</label>
                    <select
                      id="baby_id"
                      value={form.baby_id}
                      onChange={(e) => handleChange('baby_id', e.target.value)}
                    >
                      <option value="">Select baby</option>
                      {babies.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="hospital_name">Hospital / Clinic Name</label>
                  <input
                    id="hospital_name"
                    type="text"
                    value={form.hospital_name}
                    onChange={(e) => handleChange('hospital_name', e.target.value)}
                    placeholder="e.g. Patan Hospital"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="doctor_name">Doctor Name</label>
                  <input
                    id="doctor_name"
                    type="text"
                    value={form.doctor_name}
                    onChange={(e) => handleChange('doctor_name', e.target.value)}
                    placeholder="e.g. Dr. Sharma"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reason">Reason for Visit</label>
                  <input
                    id="reason"
                    type="text"
                    value={form.reason}
                    onChange={(e) => handleChange('reason', e.target.value)}
                    placeholder="e.g. Routine Checkup"
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="visit_date">Visit Date</label>
                    <input
                      id="visit_date"
                      type="date"
                      value={form.visit_date}
                      onChange={(e) => handleChange('visit_date', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="follow_up_date">Follow-up Date</label>
                    <input
                      id="follow_up_date"
                      type="date"
                      value={form.follow_up_date}
                      onChange={(e) => handleChange('follow_up_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <input
                    id="notes"
                    type="text"
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Diagnosis, prescription, observations..."
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary hospital-primary-btn">
                    {editingId ? 'Save Changes' : 'Add Visit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <BottomNavigation activeTab="Hospital" />
    </div>
  );
}
