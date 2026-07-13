import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ChevronDown, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { EMERGENCY_SIGNS } from '../../data/vaccineEnrichment';

const SEVERITY_GROUPS = [
  { key: 'critical', label: 'Critical - Call 911 Immediately', icon: AlertCircle, color: 'critical', count: EMERGENCY_SIGNS.filter(s => s.severity === 'critical').length },
  { key: 'serious', label: 'Serious - Contact Provider Now', icon: AlertTriangle, color: 'serious', count: EMERGENCY_SIGNS.filter(s => s.severity === 'serious').length },
  { key: 'moderate', label: 'Monitor & Discuss at Next Visit', icon: Info, color: 'moderate', count: EMERGENCY_SIGNS.filter(s => s.severity === 'moderate').length },
];

export default function EmergencySignsList() {
  const [expandedSections, setExpandedSections] = useState({
    critical: true,
    serious: true,
    moderate: false,
  });

  const toggleSection = (severity) => {
    setExpandedSections(prev => ({
      ...prev,
      [severity]: !prev[severity]
    }));
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'serious': return '⚠️';
      case 'moderate': return '📋';
      default: return '📌';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'critical': return 'URGENT';
      case 'serious': return 'SERIOUS';
      case 'moderate': return 'MONITOR';
      default: return severity.toUpperCase();
    }
  };

  return (
    <motion.div
      className="emergency-signs-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Disclaimer Banner */}
      <motion.div
        className="emergency-disclaimer-banner"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ShieldAlert className="emergency-disclaimer-icon" size={20} color="#ef4444" />
        <span className="emergency-disclaimer-text">
          If you experience any of these symptoms, contact your healthcare provider or go to the nearest emergency room immediately.
        </span>
      </motion.div>

      {/* Emergency Signs Sections */}
      <motion.div
        className="emergency-signs-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {SEVERITY_GROUPS.map((group, groupIndex) => {
          const signs = EMERGENCY_SIGNS.filter(s => s.severity === group.key);
          const isExpanded = expandedSections[group.key];
          const IconComponent = group.icon;

          return (
            <motion.div key={group.key} className="emergency-severity-group">
              {/* Section Header */}
              <div className="emergency-signs-section-header" onClick={() => toggleSection(group.key)}>
                <div className="emergency-signs-section-title-row">
                  <IconComponent className="emergency-signs-section-icon" size={18} style={{ color: group.color === 'critical' ? '#ef4444' : group.color === 'serious' ? '#f97316' : '#a0aec0' }} />
                  <h3>{group.label}</h3>
                  <span className={`emergency-signs-count ${group.color}`}>{group.count}</span>
                </div>
                <ChevronDown 
                  className={`emergency-signs-expand-btn ${isExpanded ? 'rotated' : ''}`}
                  size={18}
                  style={{ color: group.color === 'critical' ? '#ef4444' : group.color === 'serious' ? '#f97316' : '#a0aec0' }}
                />
              </div>

              {/* Section Content */}
              <motion.div
                className={`emergency-signs-list ${isExpanded ? '' : 'collapsed'}`}
                initial={false}
                animate={{ 
                  maxHeight: isExpanded ? 500 : 0,
                  opacity: isExpanded ? 1 : 0,
                  paddingTop: isExpanded ? 0 : 0,
                  paddingBottom: isExpanded ? 0 : 0
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0, 0.2, 1],
                  maxHeight: { duration: 0.3 }
                }}
              >
                {signs.map((sign, index) => (
                  <motion.div
                    key={sign.text}
                    className={`emergency-signs-item ${sign.severity}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                  >
                    <span className="emergency-signs-item-icon">{getSeverityIcon(sign.severity)}</span>
                    <div className="emergency-signs-item-content">
                      <p className="emergency-signs-item-text">{sign.text}</p>
                      <span className={`emergency-signs-item-severity ${sign.severity}`}>
                        {getSeverityLabel(sign.severity)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Note */}
      <motion.div
        className="emergency-footer-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <p>
          Trust your instincts — you know your body and your baby best. If something feels wrong, don't hesitate to reach out to your care team.
        </p>
      </motion.div>
    </motion.div>
  );
}