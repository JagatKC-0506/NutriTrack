/**
 * BOTTOM NAVIGATION COMPONENT
 * ===========================
 * Mobile navigation bar with main sections (Profile removed per request)
 * Active state indicated by color
 * Now navigable with routing
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BottomNavigation({ activeTab = "Home", userType: userTypeProp }) {
  const navigate = useNavigate();

  const inferredUserType = userTypeProp || localStorage.getItem('userType') || localStorage.getItem('selectedStage') || 'pregnant';

  const tabs = useMemo(() => {
    if (inferredUserType === 'pregnant') {
      return [
        { id: 1, label: "Home", icon: "🏠", path: "/pregnant/home" },
        { id: 2, label: "Nutrition", icon: "🍎", path: "/pregnant/nutrition" },
        { id: 3, label: "Vaccines", icon: "💉", path: "/pregnant/vaccines" },
        { id: 4, label: "Hospital", icon: "🏥", path: "/hospital-visits" }
      ];
    }

    // new parents keep full set minus Profile
    return [
      { id: 1, label: "Home", icon: "🏠", path: "/home" },
      { id: 2, label: "Nutrition", icon: "🍎", path: "/nutrition" },
      { id: 3, label: "Vaccines", icon: "💉", path: "/vaccines" },
      { id: 4, label: "Feeding", icon: "👶", path: "/feeding" },
      { id: 5, label: "Growth", icon: "📈", path: "/growth" },
      { id: 6, label: "Hospital", icon: "🏥", path: "/hospital-visits" }
    ];
  }, [inferredUserType]);

  return (
    <nav className="bottom-navigation">
      {tabs.map((tab) => (
        <button 
          key={tab.id} 
          type="button"
          role="tab"
          aria-selected={activeTab === tab.label}
          aria-label={tab.label}
          className={`nav-item ${activeTab === tab.label ? 'active' : ''}`}
          onClick={() => navigate(tab.path)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
