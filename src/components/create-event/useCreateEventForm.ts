import { useState, useEffect, useCallback } from 'react';
import {
  CreateEventFormData,
  ActivityType,
  TransportType,
  PublicTransportDetails,
  CarTransportDetails,
  ROUTE_BASED_ACTIVITIES,
} from './types';
import { nextSaturday } from 'date-fns';

const STORAGE_KEY = 'create-event-draft';

function getDefaultFormData(): CreateEventFormData {
  return {
    activityType: null,
    routeId: null,
    date: nextSaturday(new Date()),
    time: '09:00',
    eventName: '',
    maxParticipants: 10,
    description: '',
    addDisclaimer: false,
    disclaimerText: '',
    transportType: null,
    publicTransport: {
      meetingPoint: '',
      ticketCost: '',
      instructions: '',
    },
    carTransport: {
      pickupLocation: '',
      fuelCost: '',
      carDescription: '',
    },
  };
}

export function useCreateEventForm() {
  const [formData, setFormData] = useState<CreateEventFormData>(getDefaultFormData);
  const [currentStep, setCurrentStep] = useState(1);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({
          ...getDefaultFormData(),
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
    const defaults = getDefaultFormData();
    return (
      formData.activityType !== null ||
      formData.routeId !== null ||
      formData.eventName !== '' ||
      formData.description !== '' ||
      formData.transportType !== null ||
      formData.maxParticipants !== defaults.maxParticipants
    );
  }, [formData]);

  const clearForm = useCallback(() => {
    setFormData(getDefaultFormData());
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

  const setEventName = useCallback((name: string) => {
    setFormData((prev) => ({ ...prev, eventName: name }));
  }, []);

  const setMaxParticipants = useCallback((count: number) => {
    setFormData((prev) => ({ ...prev, maxParticipants: count }));
  }, []);

  const setDescription = useCallback((desc: string) => {
    setFormData((prev) => ({ ...prev, description: desc }));
  }, []);

  const setAddDisclaimer = useCallback((add: boolean) => {
    setFormData((prev) => ({ ...prev, addDisclaimer: add }));
  }, []);

  const setDisclaimerText = useCallback((text: string) => {
    setFormData((prev) => ({ ...prev, disclaimerText: text }));
  }, []);

  const setTransportType = useCallback((type: TransportType) => {
    setFormData((prev) => ({ ...prev, transportType: type }));
  }, []);

  const setPublicTransport = useCallback((details: Partial<PublicTransportDetails>) => {
    setFormData((prev) => ({
      ...prev,
      publicTransport: { ...prev.publicTransport, ...details },
    }));
  }, []);

  const setCarTransport = useCallback((details: Partial<CarTransportDetails>) => {
    setFormData((prev) => ({
      ...prev,
      carTransport: { ...prev.carTransport, ...details },
    }));
  }, []);

  // Steps:
  // 1: Activity Type
  // 2: Route Selection (conditional)
  // 3: Date & Time
  // 4: Event Details (name, participants)
  // 5: Description & Legal
  // 6: Transportation
  // 7: Review

  const getTotalSteps = useCallback(() => {
    if (!formData.activityType) return 7;
    return ROUTE_BASED_ACTIVITIES.includes(formData.activityType) ? 7 : 6;
  }, [formData.activityType]);

  const getActualStep = useCallback(
    (logicalStep: number): number => {
      // If not route-based, skip step 2
      if (formData.activityType && !ROUTE_BASED_ACTIVITIES.includes(formData.activityType)) {
        if (logicalStep >= 2) return logicalStep + 1;
      }
      return logicalStep;
    },
    [formData.activityType]
  );

  const getLogicalStep = useCallback(
    (actualStep: number): number => {
      // If not route-based, adjust for skipped step 2
      if (formData.activityType && !ROUTE_BASED_ACTIVITIES.includes(formData.activityType)) {
        if (actualStep >= 3) return actualStep - 1;
      }
      return actualStep;
    },
    [formData.activityType]
  );

  const goToNextStep = useCallback(() => {
    if (!formData.activityType) return;

    const isRouteBased = ROUTE_BASED_ACTIVITIES.includes(formData.activityType);
    // Always use 7 as maxStep - non-route-based just skips step 2
    const maxStep = 7;

    if (currentStep === 1) {
      if (isRouteBased) {
        setCurrentStep(2);
      } else {
        setCurrentStep(3); // Skip route selection
      }
    } else if (currentStep < maxStep) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, formData.activityType]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep === 1) return;

    const isRouteBased =
      formData.activityType && ROUTE_BASED_ACTIVITIES.includes(formData.activityType);

    if (currentStep === 3 && !isRouteBased) {
      setCurrentStep(1); // Skip back over route selection
    } else {
      setCurrentStep((prev) => prev - 1);
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
    setEventName,
    setMaxParticipants,
    setDescription,
    setAddDisclaimer,
    setDisclaimerText,
    setTransportType,
    setPublicTransport,
    setCarTransport,
    getTotalSteps,
    getLogicalStep,
    goToNextStep,
    goToPreviousStep,
  };
}
