import { useState, useEffect, useCallback } from 'react';
import { CreateEventFormData, ActivityType, ROUTE_BASED_ACTIVITIES } from './types';

const STORAGE_KEY = 'create-event-draft';

const initialFormData: CreateEventFormData = {
  activityType: null,
  routeId: null,
  date: null,
  time: null,
};

export function useCreateEventForm() {
  const [formData, setFormData] = useState<CreateEventFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({
          ...parsed,
          date: parsed.date ? new Date(parsed.date) : null,
        });
        if (parsed.currentStep) {
          setCurrentStep(parsed.currentStep);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const dataToSave = {
      ...formData,
      date: formData.date?.toISOString() ?? null,
      currentStep,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData, currentStep]);

  const hasUnsavedChanges = useCallback(() => {
    return (
      formData.activityType !== null ||
      formData.routeId !== null ||
      formData.date !== null ||
      formData.time !== null
    );
  }, [formData]);

  const clearForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setActivityType = useCallback((type: ActivityType) => {
    setFormData((prev) => ({ ...prev, activityType: type }));
  }, []);

  const setRouteId = useCallback((id: string) => {
    setFormData((prev) => ({ ...prev, routeId: id }));
  }, []);

  const setDate = useCallback((date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date: date ?? null }));
  }, []);

  const setTime = useCallback((time: string) => {
    setFormData((prev) => ({ ...prev, time }));
  }, []);

  const getTotalSteps = useCallback(() => {
    if (!formData.activityType) return 3;
    return ROUTE_BASED_ACTIVITIES.includes(formData.activityType) ? 3 : 2;
  }, [formData.activityType]);

  const goToNextStep = useCallback(() => {
    if (!formData.activityType) return;
    
    if (currentStep === 1) {
      // After activity selection
      if (ROUTE_BASED_ACTIVITIES.includes(formData.activityType)) {
        setCurrentStep(2); // Go to route selection
      } else {
        setCurrentStep(3); // Skip to date/time
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  }, [currentStep, formData.activityType]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep === 3) {
      if (formData.activityType && ROUTE_BASED_ACTIVITIES.includes(formData.activityType)) {
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  }, [currentStep, formData.activityType]);

  return {
    formData,
    currentStep,
    hasUnsavedChanges,
    clearForm,
    setActivityType,
    setRouteId,
    setDate,
    setTime,
    getTotalSteps,
    goToNextStep,
    goToPreviousStep,
  };
}
