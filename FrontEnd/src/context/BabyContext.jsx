import { createContext, useContext, useState, useEffect } from 'react';
import { getBabies, getAuthToken } from '../api';

const BabyContext = createContext();

export const useBabyContext = () => {
  const context = useContext(BabyContext);
  if (!context) {
    throw new Error('useBabyContext must be used within BabyProvider');
  }
  return context;
};

export const BabyProvider = ({ children }) => {
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch babies on mount
  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          const babiesData = await getBabies().catch(() => []);
          if (babiesData && babiesData.length > 0) {
            setBabies(babiesData);
            
            // Get selected baby from localStorage or use first active baby
            const savedBabyId = localStorage.getItem('selectedBabyId');
            const savedBaby = babiesData.find(b => b.id === parseInt(savedBabyId));
            
            if (savedBaby) {
              setSelectedBaby(savedBaby);
            } else {
              const activeBaby = babiesData.find(b => b.is_active) || babiesData[0];
              setSelectedBaby(activeBaby);
              localStorage.setItem('selectedBabyId', activeBaby.id);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching babies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBabies();
  }, []);

  const handleSelectBaby = (baby) => {
    setSelectedBaby(baby);
    localStorage.setItem('selectedBabyId', baby.id);
  };

  const value = {
    babies,
    selectedBaby,
    setSelectedBaby: handleSelectBaby,
    loading,
    setBabies
  };

  return (
    <BabyContext.Provider value={value}>
      {children}
    </BabyContext.Provider>
  );
};

export default BabyContext;
