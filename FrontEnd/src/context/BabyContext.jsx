import { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  const clearBabyState = useCallback(() => {
    setBabies([]);
    setSelectedBaby(null);
    localStorage.removeItem('selectedBabyId');
  }, []);

  const refreshBabies = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        clearBabyState();
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const babiesData = await getBabies().catch(() => []);
      
      if (babiesData && babiesData.length > 0) {
        setBabies(babiesData);
        const savedBabyId = localStorage.getItem('selectedBabyId');
        const savedBaby = savedBabyId ? babiesData.find(b => b.id === parseInt(savedBabyId)) : null;
        
        if (savedBaby) {
          setSelectedBaby(savedBaby);
        } else {
          const activeBaby = babiesData.find(b => b.is_active) || babiesData[0];
          setSelectedBaby(activeBaby);
          if (activeBaby) {
            localStorage.setItem('selectedBabyId', activeBaby.id);
          } else {
            localStorage.removeItem('selectedBabyId');
          }
        }
      } else {
        clearBabyState();
      }
    } catch (error) {
      console.error('Error refreshing babies:', error);
      clearBabyState();
    } finally {
      setLoading(false);
    }
  }, [clearBabyState]);

  useEffect(() => {
    let isMounted = true;
    
    if (isMounted) {
      refreshBabies();
    }

    const handleLogin = () => setTimeout(refreshBabies, 100);
    const handleLogout = clearBabyState;
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token') {
        if (!e.newValue) clearBabyState();
        else refreshBabies();
      }
    };

    window.addEventListener('login', handleLogin);
    window.addEventListener('logout', handleLogout);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      isMounted = false;
      window.removeEventListener('login', handleLogin);
      window.removeEventListener('logout', handleLogout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshBabies, clearBabyState]);

  const handleSelectBaby = useCallback((baby) => {
    setSelectedBaby(baby);
    if (baby) {
      localStorage.setItem('selectedBabyId', baby.id);
    } else {
      localStorage.removeItem('selectedBabyId');
    }
  }, []);

  const value = {
    babies,
    selectedBaby,
    setSelectedBaby: handleSelectBaby,
    loading,
    setBabies,
    refreshBabies
  };

  return (
    <BabyContext.Provider value={value}>
      {children}
    </BabyContext.Provider>
  );
};

export default BabyContext;
