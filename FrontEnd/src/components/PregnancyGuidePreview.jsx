import { useNavigate } from 'react-router-dom'

export default function PregnancyGuidePreview() {
  const navigate = useNavigate()

  return (
    <div className="doc-grid">
      <div className="doc-card" onClick={() => navigate('/pregnant/health-guide')}>
        <span className="doc-icon">🩺</span>
        <span className="doc-card-title">Pregnancy<br/>Guide</span>
      </div>
      <div className="doc-card" onClick={() => navigate('/pregnant/emergency')}>
        <span className="doc-icon">🚨</span>
        <span className="doc-card-title">Emergency<br/>Warning Signs</span>
      </div>
    </div>
  )
}