/**
 * VACCINE INFO MODAL COMPONENT
 * ============================
 * Shows detailed educational information about a vaccine
 * Uses enrichment data when available, falls back to description
 */

export default function VaccineInfoModal({ vaccine, enrichment, onClose }) {
  if (!vaccine) return null;

  return (
    <div className="vaccine-info-overlay" onClick={onClose}>
      <div className="vaccine-info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="vaccine-info-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="vaccine-info-header">
          <span className="vaccine-info-emoji">{vaccine.emoji || '💉'}</span>
          <h2>{vaccine.name}</h2>
        </div>

        <div className="vaccine-info-body">
          {enrichment?.recommendedWeeks && (
            <div className="vaccine-info-section">
              <h4>📅 Recommended Timing</h4>
              <p>
                {enrichment.recommendedWeeks[0] === 0 && enrichment.recommendedWeeks[1] === 40
                  ? 'Anytime during pregnancy'
                  : `Weeks ${enrichment.recommendedWeeks[0]} - ${enrichment.recommendedWeeks[1]} of pregnancy`}
              </p>
            </div>
          )}

          {enrichment?.doseInfo && (
            <div className="vaccine-info-section">
              <h4>💉 Dose Information</h4>
              <p>{enrichment.doseInfo}</p>
            </div>
          )}

          {vaccine.description && (
            <div className="vaccine-info-section">
              <h4>ℹ️ About This Vaccine</h4>
              <p>{vaccine.description}</p>
            </div>
          )}

          {enrichment?.protection && enrichment.protection.length > 0 && (
            <div className="vaccine-info-section">
              <h4>🛡️ Protection</h4>
              <ul>
                {enrichment.protection.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {enrichment?.importance && (
            <div className="vaccine-info-section">
              <h4>❤️ Why This Vaccine?</h4>
              <p>{enrichment.importance}</p>
            </div>
          )}

          {enrichment?.benefitsMother && enrichment.benefitsMother.length > 0 && (
            <div className="vaccine-info-section">
              <h4>🤰 Benefits for Mother</h4>
              <ul>
                {enrichment.benefitsMother.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {enrichment?.benefitsBaby && enrichment.benefitsBaby.length > 0 && (
            <div className="vaccine-info-section">
              <h4>👶 Benefits for Baby</h4>
              <ul>
                {enrichment.benefitsBaby.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {enrichment?.sideEffects && enrichment.sideEffects.length > 0 && (
            <div className="vaccine-info-section">
              <h4>⚡ Common Side Effects</h4>
              <ul>
                {enrichment.sideEffects.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {enrichment?.safety && (
            <div className="vaccine-info-section">
              <h4>✅ Safety</h4>
              <p>{enrichment.safety}</p>
            </div>
          )}

          {enrichment?.whenToContactDoctor && (
            <div className="vaccine-info-section">
              <h4>📞 When to Contact Doctor</h4>
              <p>{enrichment.whenToContactDoctor}</p>
            </div>
          )}

          {enrichment?.whoRecommendation && (
            <div className="vaccine-info-section">
              <h4>🌍 WHO Recommendation</h4>
              <p>{enrichment.whoRecommendation}</p>
            </div>
          )}
        </div>

        <button className="vaccine-info-gotit" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
