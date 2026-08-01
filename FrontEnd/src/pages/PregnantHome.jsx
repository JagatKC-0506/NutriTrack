/**
 * PREGNANT HOME PAGE COMPONENT
 * ============================
 * Minimal and clean home page specifically for pregnant users
 * Displays pregnancy progress, reminders, and daily tips
 * Pregnancy-focused information only
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import GreetingCard from '../components/GreetingCard';
import NotificationBanner from '../components/NotificationBanner';
import EmergencyAlerts from '../components/EmergencyAlerts';
import DailyChecklist from '../components/pregnancy/DailyChecklist';
import BottomNavigation from '../components/BottomNavigation';
import NotificationService from '../services/NotificationService';
import { getReminders, getCurrentUser, getUserProfile, getAuthToken, getUserVaccineReminders, getEmergencyContact, saveEmergencyContact } from '../api';
import { useToast } from '../context/ToastContext';
import '../styles/Home.css';
import '../styles/Pregnancy.css';

const DAY_MS = 24 * 60 * 60 * 1000;

// Calculate trimester from due date
const calculateTrimester = (dueDateString) => {
  if (!dueDateString) return { trimester: 'Unknown', weeksPregnant: null };

  const dueDate = new Date(dueDateString);
  if (Number.isNaN(dueDate.getTime())) return { trimester: 'Unknown', weeksPregnant: null };

  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const estimatedLmp = new Date(dueDate.getTime() - 280 * DAY_MS); // 40 weeks before due date
  const normalizedLmp = new Date(estimatedLmp.getFullYear(), estimatedLmp.getMonth(), estimatedLmp.getDate());

  const daysPregnant = Math.floor((normalizedToday - normalizedLmp) / DAY_MS);
  if (daysPregnant < 0) return { trimester: 'Unknown', weeksPregnant: 0 };

  const weeksPregnant = Math.min(40, Math.floor(daysPregnant / 7));

  if (weeksPregnant < 13) {
    return { trimester: 'Trimester 1', weeksPregnant };
  }
  if (weeksPregnant < 28) {
    return { trimester: 'Trimester 2', weeksPregnant };
  }
  return { trimester: 'Trimester 3', weeksPregnant };
};

export default function PregnantHome() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [_notificationPermission, setNotificationPermission] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showEmergencyAdd, setShowEmergencyAdd] = useState(false);
  const [emergencyForm, setEmergencyForm] = useState({ name: '', phone: '', relationship: '' });
  const [notifLoading, setNotifLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    userName: "Loading...",
    trimester: "Calculating...",
    dueDate: null,
    weeksPregnant: null,
    userType: 'pregnant'
  });
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  // Initialize notification service on component mount
  useEffect(() => {
    const initializeNotifications = async () => {
      const hasPermission = await NotificationService.initialize();
      setNotificationPermission(hasPermission);
    };

    const fetchData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.log('No authentication token found');
          setUserData({
            userName: "Guest",
            trimester: "Unknown",
            dueDate: null,
            weeksPregnant: null,
            userType: 'pregnant'
          });
          setLoading(false);
          return;
        }

        // Fetch current user from backend
        const user = await getCurrentUser();
        const { trimester, weeksPregnant } = calculateTrimester(user.due_date);
        
        setUserData({
          userName: user.full_name || "Expecting Mom",
          trimester: trimester,
          dueDate: user.due_date,
          weeksPregnant: weeksPregnant,
          userType: 'pregnant'
        });

        const profile = await getUserProfile().catch(() => null);
        if (profile?.profile_image) {
          setProfileImage(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/${profile.profile_image}`);
        }

        // Fetch emergency contacts
        const ecs = await getEmergencyContact().catch(() => []);
        setEmergencyContacts(Array.isArray(ecs) ? ecs : []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({
          userName: "Guest",
          trimester: "Unknown",
          dueDate: null,
          weeksPregnant: null,
          userType: 'pregnant'
        });
      }

      try {
        // Fetch pregnancy-related reminders
        const remindersData = await getReminders().catch(() => []);
        
        // Filter reminders to show only today's reminders
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
        const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
        
        const todayReminders = remindersData.filter(r => {
          const reminderDate = new Date(r.reminder_date);
          return reminderDate >= todayStart && reminderDate <= todayEnd;
        });
        
        setReminders(todayReminders.map(r => ({
          id: r.id,
          title: r.title,
          description: r.description || '',
          formattedDate: new Date(r.reminder_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          icon: '📅'
        })));
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
      
      setLoading(false);
    };

    initializeNotifications();
    fetchData();
  }, []);

  const fetchNotifications = async () => {
    setNotifLoading(true);
    try {
      const [remindersData, vaccineReminders] = await Promise.all([
        getReminders().catch(() => []),
        getUserVaccineReminders().catch(() => []),
      ]);
      const all = [
        ...vaccineReminders.map(v => ({ ...v, type: 'vaccine', icon: '💉' })),
        ...remindersData.map(r => ({ ...r, type: 'reminder', icon: '📅' })),
      ];
      all.sort((a, b) => new Date(a.reminder_date) - new Date(b.reminder_date));
      setNotifications(all);
    } catch (e) {
      console.error(e);
    } finally {
      setNotifLoading(false);
    }
  };

  const handleOpenNotifications = () => {
    setShowNotifications(true);
    fetchNotifications();
  };

  const handleEmergencySave = async () => {
    if (!emergencyForm.name || !emergencyForm.phone || !emergencyForm.relationship) {
      addToast('Name, phone, and relationship are required', 'error');
      return;
    }
    try {
      await saveEmergencyContact(emergencyForm);
      const ecs = await getEmergencyContact().catch(() => []);
      setEmergencyContacts(Array.isArray(ecs) ? ecs : []);
      setEmergencyForm({ name: '', phone: '', relationship: '' });
      setShowEmergencyAdd(false);
      addToast('Emergency contact added', 'success');
    } catch (err) {
      addToast(err.message || 'Save failed', 'error');
    }
  };

  const [notifications, setNotifications] = useState([]);

  return (
    <div className="home-container">
      {/* Main Content */}
      <div className="home-content">
        
        {/* Notification Permission Banner */}
        <NotificationBanner 
          onPermissionChange={(granted) => setNotificationPermission(granted)}
        />

        {/* Greeting Section - Pregnancy specific */}
        <GreetingCard 
          userName={userData.userName}
          trimester={userData.trimester}
          dueDate={userData.dueDate}
          weeksPregnant={userData.weeksPregnant}
          userType="pregnant"
          profileImage={profileImage}
          onNotificationClick={handleOpenNotifications}
        />

        {/* Emergency Alerts Carousel */}
        <EmergencyAlerts navigateTo="/pregnant/vaccines/health" />

        {/* Quick Access Navigation */}
        <div className="quick-nav">
          {emergencyContacts.length > 0 && (
            <div className="quick-nav-card" onClick={() => setShowEmergency(true)}>
              <span className="quick-nav-icon">📞</span>
              <span className="quick-nav-label">Emergency Contact</span>
            </div>
          )}
          <div className="quick-nav-card" onClick={() => navigate('/pregnant/vaccines/health')}>
            <span className="quick-nav-icon">🩺</span>
            <span className="quick-nav-label">Medical Tests</span>
          </div>
          <div className="quick-nav-card" onClick={() => navigate('/pregnant/health-guide')}>
            <span className="quick-nav-icon">📖</span>
            <span className="quick-nav-label">Pregnancy Guide</span>
          </div>
          <div className="quick-nav-card" onClick={() => navigate('/pregnant/emergency')}>
            <span className="quick-nav-icon">🚨</span>
            <span className="quick-nav-label">Emergency</span>
          </div>
        </div>

        <DailyChecklist />
      </div>

      {/* Emergency Contact Modal */}
      {showEmergency && (
        <div className="notif-overlay" onClick={() => { setShowEmergency(false); setShowEmergencyAdd(false); }}>
          <div className="notif-panel" onClick={e => e.stopPropagation()}>
            <div className="notif-panel-header">
              <h2>{showEmergencyAdd ? '➕ Add Emergency Contact' : '📞 Emergency Contact'}</h2>
              <div className="emergency-modal-actions">
                {!showEmergencyAdd && (
                  <button className="emergency-add-btn" title="Add contact" onClick={() => setShowEmergencyAdd(true)}>+</button>
                )}
                <button className="notif-close-btn" onClick={() => { setShowEmergency(false); setShowEmergencyAdd(false); }}>✕</button>
              </div>
            </div>
            {showEmergencyAdd ? (
              <div className="notif-panel-body">
                <div className="emergency-form">
                  <label className="emergency-label">Contact Name</label>
                  <input className="emergency-input" value={emergencyForm.name} onChange={e => setEmergencyForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" />
                  <label className="emergency-label">Phone Number</label>
                  <input className="emergency-input" value={emergencyForm.phone} onChange={e => setEmergencyForm(p => ({ ...p, phone: e.target.value }))} placeholder="+977 98XXXXXXXX" />
                  <label className="emergency-label">Relationship</label>
                  <select className="emergency-input" value={emergencyForm.relationship} onChange={e => setEmergencyForm(p => ({ ...p, relationship: e.target.value }))}>
                    <option value="">Select relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="doctor">Doctor</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="emergency-form-actions">
                    <button className="emergency-cancel-btn" onClick={() => setShowEmergencyAdd(false)}>Cancel</button>
                    <button className="emergency-save-btn" onClick={handleEmergencySave}>Save Contact</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="notif-panel-body">
                <div className="emergency-list">
                  {emergencyContacts.map(c => (
                    <div key={c.id} className="emergency-row">
                      <div className="emergency-info">
                        <span className="emergency-name">
                          {c.name}
                          <span className="emergency-rel">
                            {c.relationship ? ` • ${c.relationship}` : ''}
                          </span>
                        </span>
                        <span className="emergency-phone">{c.phone}</span>
                      </div>
                      <a className="emergency-call-btn" href={`tel:${c.phone}`} title={`Call ${c.name}`}>
                        <Phone size={18} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotifications && (
        <div className="notif-overlay" onClick={() => setShowNotifications(false)}>
          <div className="notif-panel" onClick={e => e.stopPropagation()}>
            <div className="notif-panel-header">
              <h2>🔔 Notifications</h2>
              <button className="notif-close-btn" onClick={() => setShowNotifications(false)}>✕</button>
            </div>
            <div className="notif-panel-body">
              {notifLoading ? (
                <p className="notif-empty">Loading...</p>
              ) : notifications.length === 0 ? (
                <p className="notif-empty">No notifications yet.</p>
              ) : (
                notifications.map((n, i) => (
                  <div key={n.id || i} className="notif-item">
                    <span className="notif-icon">{n.icon}</span>
                    <div className="notif-content">
                      <p className="notif-title">{n.title || n.vaccine_name}</p>
                      {n.description && <p className="notif-desc">{n.description}</p>}
                      {(n.dose_number != null) && (
                        <p className="notif-desc">Dose {n.dose_number}{n.total_doses ? ` of ${n.total_doses}` : ''}</p>
                      )}
                      <p className="notif-date">
                        {new Date(n.reminder_date || n.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </p>
                    </div>
                    {n.status === 'completed' && <span className="notif-status">✅</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="Home" userType="pregnant" />
    </div>
  );
}
