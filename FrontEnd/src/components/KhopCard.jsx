/**
 * KHOP CARD COMPONENT (खोप कार्ड)
 * ================================
 * Displays vaccination card showing completed vaccines
 * Formatted like the official vaccination card
 */

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveOrSharePdf } from '../utils/exportPdf';
import logo from '../assets/logo.png';
import '../styles/KhopCard.css';

export default function KhopCard({ isOpen, onClose, personName, dateLabel = 'जन्म मिति :', dateValue, ageLabel, completedVaccines }) {
  if (!isOpen) return null;

  const cardRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handlePrint = async () => {
    if (!cardRef.current) return;
    setCapturing(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const ratio = Math.min((pageW - 20) / canvas.width, (pageH - 20) / canvas.height);
      const imgW = canvas.width * ratio;
      const imgH = canvas.height * ratio;
      doc.addImage(imgData, 'JPEG', (pageW - imgW) / 2, (pageH - imgH) / 2, imgW, imgH);
      await saveOrSharePdf(doc, 'khop-card.pdf');
    } catch (error) {
      console.error('Khop card export failed:', error);
    } finally {
      setCapturing(false);
    }
  };

  return (
    <div className="khop-card-overlay" onClick={onClose}>
      <div className={`khop-card-modal ${capturing ? 'khop-capturing' : ''}`} ref={cardRef} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="khop-card-close" onClick={onClose}>×</button>

        {/* Header with logo */}
        <div className="khop-card-header">
          <img src={logo} alt="Logo" className="khop-card-logo" />
          <p>खोप कार्ड</p>
          <h2>टीकाकरण रेकर्ड</h2>
        </div>

        {/* Person Information */}
        <div className="khop-card-info">
          <div className="khop-info-row">
            <label>नाम :</label>
            <span>{personName || 'N/A'}</span>
          </div>
          <div className="khop-info-row">
            <label>{dateLabel}</label>
            <span>{formatDate(dateValue)}</span>
          </div>
          <div className="khop-info-row">
            <label>उमेर :</label>
            <span>{ageLabel || 'N/A'}</span>
          </div>
        </div>

        {/* Vaccination Table */}
        <div className="khop-card-table-section">
          <table className="khop-card-table">
            <thead>
              <tr>
                <th>खोप लगाएको क्रम</th>
                <th>खोप लगाएको तारिख</th>
                <th>खोप प्रकार</th>
              </tr>
            </thead>
            <tbody>
              {completedVaccines && completedVaccines.length > 0 ? (
                completedVaccines.map((vaccine, index) => (
                  <tr key={vaccine.id || index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(vaccine.last_dose_date || vaccine.reminder_date)}</td>
                    <td>{vaccine.vaccine_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: '#999' }}>
                    कुनै पनि खोप लगाइएको छैन
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Notes */}
        <div className="khop-card-footer">
          <p>यो कार्ड बोझो पुस्तक खोप लिन आउँदा लिएर आउनुपर्छ।</p>
        </div>

        {/* Print Button */}
        <div className="khop-card-actions">
          <button className="khop-card-print-btn" onClick={handlePrint} disabled={capturing}>
            {capturing ? '⏳ Generating PDF…' : '🖨️ Print / Save Card'}
          </button>
        </div>
      </div>
    </div>
  );
}
