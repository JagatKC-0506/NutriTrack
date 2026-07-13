import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Clock, AlertTriangle, CheckCircle2, XCircle, ChevronDown, ExternalLink,
  Heart, Baby, Stethoscope, Globe, Phone, Syringe,
} from 'lucide-react';

const STATUS_CONFIG = {
  completed: { icon: CheckCircle2, label: 'Completed', className: 'vaccine-card-status-completed', color: 'var(--success-green)' },
  'due-soon': { icon: Clock, label: 'Due Soon', className: 'vaccine-card-status-due', color: 'var(--warning-orange)' },
  upcoming: { icon: ShieldCheck, label: 'Upcoming', className: 'vaccine-card-status-upcoming', color: 'var(--vaccine-blue)' },
  overdue: { icon: AlertTriangle, label: 'Overdue', className: 'vaccine-card-status-overdue', color: 'var(--upcoming-red)' },
  optional: { icon: XCircle, label: 'Optional', className: 'vaccine-card-status-optional', color: 'var(--text-gray)' },
};

export default function VaccineCard({
  vaccine,
  enrichment,
  status,
  onMarkDone,
  trackingLoading,
}) {
  const [expanded, setExpanded] = useState(false);

  const StatusIcon = STATUS_CONFIG[status]?.icon || ShieldCheck;
  const statusLabel = STATUS_CONFIG[status]?.label || 'Pending';
  const statusClass = STATUS_CONFIG[status]?.className || '';
  const statusColor = STATUS_CONFIG[status]?.color || 'var(--text-main)';

  const isCompleted = status === 'completed';

  return (
    <motion.div
      className={`vaccine-card-new ${isCompleted ? 'completed' : ''} ${statusClass}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="vaccine-card-new-main" onClick={() => setExpanded(!expanded)}>
        <div className="vaccine-card-new-top">
          <span className="vaccine-card-new-emoji">{vaccine.emoji || '💉'}</span>
          <div className="vaccine-card-new-info">
            <h3 className="vaccine-card-new-name">{vaccine.name}</h3>
            {enrichment?.protection && (
              <p className="vaccine-card-new-protection">{enrichment.protection[0]}</p>
            )}
          </div>
          <div className={`vaccine-card-new-status ${statusClass}`}>
            <StatusIcon size={14} />
            <span>{statusLabel}</span>
          </div>
        </div>

        <div className="vaccine-card-new-meta">
          {enrichment?.recommendedWeeks && (
            <span className="vaccine-card-new-meta-item">
              <Syringe size={12} />
              Weeks {enrichment.recommendedWeeks[0]}-{enrichment.recommendedWeeks[1]}
            </span>
          )}
          {enrichment?.doseInfo && (
            <span className="vaccine-card-new-meta-item">
              <Clock size={12} />
              {enrichment.doseInfo}
            </span>
          )}
        </div>

        {!isCompleted && (
          <div className="vaccine-card-new-actions">
            <button
              className="vaccine-card-new-mark-btn"
              onClick={(e) => { e.stopPropagation(); onMarkDone(vaccine); }}
              disabled={trackingLoading}
            >
              {trackingLoading ? 'Saving...' : 'Mark as Done'}
            </button>
          </div>
        )}
        {isCompleted && (
          <div className="vaccine-card-new-completed-badge">
            <CheckCircle2 size={16} />
            Completed
          </div>
        )}

        <div className="vaccine-card-new-expand">
          <ChevronDown
            size={18}
            className={`vaccine-card-new-chevron ${expanded ? 'rotated' : ''}`}
          />
          <span>{expanded ? 'Show Less' : 'Learn More'}</span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="vaccine-card-new-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="vaccine-card-new-details-inner">
              {enrichment?.importance && (
                <div className="vaccine-detail-section">
                  <h4><Heart size={14} /> Why This Vaccine?</h4>
                  <p>{enrichment.importance}</p>
                </div>
              )}

              {enrichment?.benefitsMother && enrichment.benefitsMother.length > 0 && (
                <div className="vaccine-detail-section">
                  <h4><Baby size={14} /> Benefits for Mother</h4>
                  <ul>
                    {enrichment.benefitsMother.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}

              {enrichment?.benefitsBaby && enrichment.benefitsBaby.length > 0 && (
                <div className="vaccine-detail-section">
                  <h4><Baby size={14} /> Benefits for Baby</h4>
                  <ul>
                    {enrichment.benefitsBaby.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}

              {enrichment?.sideEffects && enrichment.sideEffects.length > 0 && (
                <div className="vaccine-detail-section">
                  <h4><Stethoscope size={14} /> Common Side Effects</h4>
                  <ul>
                    {enrichment.sideEffects.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              {enrichment?.safety && (
                <div className="vaccine-detail-section">
                  <h4><ShieldCheck size={14} /> Safety During Pregnancy</h4>
                  <p>{enrichment.safety}</p>
                </div>
              )}

              {enrichment?.whenToContactDoctor && (
                <div className="vaccine-detail-section">
                  <h4><Phone size={14} /> When to Contact Doctor</h4>
                  <p>{enrichment.whenToContactDoctor}</p>
                </div>
              )}

              {enrichment?.whoRecommendation && (
                <div className="vaccine-detail-section who">
                  <h4><Globe size={14} /> WHO Recommendation</h4>
                  <p>{enrichment.whoRecommendation}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
