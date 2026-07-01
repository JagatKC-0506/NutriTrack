/**
 * USE FORM CUSTOM HOOK
 * ====================
 * Reusable hook for managing form state and validation
 * Reduces duplicate code in Login and Signup components
 * 
 * USAGE:
 * const { formData, error, isLoading, handleInputChange, setError, setIsLoading } = useForm(initialData)
 */

import { useState } from 'react';

export function useForm(initialData) {
  // State for form data
  const [formData, setFormData] = useState(initialData);
  
  // State for error messages
  const [error, setError] = useState('');
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  /**
   * HANDLE INPUT CHANGE
   * Runs when user types in any text field
   * Updates specific field while keeping others unchanged
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    formData,
    setFormData,
    error,
    setError,
    isLoading,
    setIsLoading,
    handleInputChange
  };
}
