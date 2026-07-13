/**
 * ADD BABY PAGE COMPONENT
 * ======================
 * Dedicated page for adding a new baby to the family
 * Standalone page extracted from Home.jsx modal
 * Provides a clean, full-screen interface for baby data entry
 */

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BabyForm from '../components/BabyForm';
import { createBaby, updateBaby } from '../api';
import { useBabyContext } from '../context/BabyContext';
import '../styles/AddBaby.css';

export default function AddBaby() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingBaby = location.state?.baby || null;
  const { babies, setBabies, setSelectedBaby } = useBabyContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveBaby = async (babyData) => {
    setIsSubmitting(true);
    try {
      if (editingBaby) {
        const updatedBaby = await updateBaby(editingBaby.id, babyData);
        setBabies(prev => prev.map(b => b.id === updatedBaby.id ? updatedBaby : b));
        setSelectedBaby(updatedBaby);
        alert('Baby information updated successfully!');
      } else {
        const newBaby = await createBaby(babyData);
        setBabies(prev => [...prev, newBaby]);
        setSelectedBaby(newBaby);
        alert('Baby added successfully!');
      }
      navigate('/home');
    } catch (error) {
      console.error('Error saving baby:', error);
      alert(`Error saving baby: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-baby-container">
      <div className="add-baby-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1>{editingBaby ? 'Edit Baby Information' : 'Add Your Baby'}</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="add-baby-content">
        <BabyForm 
          onSubmit={handleSaveBaby}
          isLoading={isSubmitting}
          initialData={editingBaby}
        />
      </div>
    </div>
  );
}
