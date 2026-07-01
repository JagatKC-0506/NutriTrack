/**
 * ADD BABY PAGE COMPONENT
 * ======================
 * Dedicated page for adding a new baby to the family
 * Standalone page extracted from Home.jsx modal
 * Provides a clean, full-screen interface for baby data entry
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BabyForm from '../components/BabyForm';
import { createBaby } from '../api';
import { useBabyContext } from '../context/BabyContext';
import '../styles/AddBaby.css';

export default function AddBaby() {
  const navigate = useNavigate();
  const { babies, setBabies, setSelectedBaby } = useBabyContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddBaby = async (babyData) => {
    setIsSubmitting(true);
    try {
      const newBaby = await createBaby(babyData);
      // Update the context with the new baby
      setBabies([...babies, newBaby]);
      setSelectedBaby(newBaby);
      alert('Baby added successfully!');
      // Navigate back to home or previous page
      navigate('/home');
    } catch (error) {
      console.error('Error adding baby:', error);
      alert(`Error adding baby: ${error.message}`);
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
        <h1>Add Your Baby</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="add-baby-content">
        <BabyForm 
          onSubmit={handleAddBaby}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
