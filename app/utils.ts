import { DayEntry, Targets, TrackerData } from './types';

const STORAGE_KEY_DATA = 'cal_tracker_data';
const STORAGE_KEY_TARGETS = 'cal_tracker_targets';

// Helper function to check if we're in the browser
const isBrowser = typeof window !== 'undefined';

export const loadTrackerData = (): TrackerData => {
  if (!isBrowser) return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY_DATA);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading tracker data:', error);
    return {};
  }
};

export const saveTrackerData = (data: TrackerData): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving tracker data:', error);
  }
};

export const loadTargets = (): Targets | null => {
  if (!isBrowser) return null;
  try {
    const targets = localStorage.getItem(STORAGE_KEY_TARGETS);
    return targets ? JSON.parse(targets) : null;
  } catch (error) {
    console.error('Error loading targets:', error);
    return null;
  }
};

export const saveTargets = (targets: Targets): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEY_TARGETS, JSON.stringify(targets));
  } catch (error) {
    console.error('Error saving targets:', error);
  }
};

export const getDayEntry = (date: string): DayEntry | null => {
  const data = loadTrackerData();
  return data[date] || null;
};

export const saveDayEntry = (entry: DayEntry): void => {
  const data = loadTrackerData();
  data[entry.date] = entry;
  saveTrackerData(data);
};

export const deleteDayEntry = (date: string): void => {
  const data = loadTrackerData();
  delete data[date];
  saveTrackerData(data);
};

export const exportData = (): string => {
  const data = loadTrackerData();
  const targets = loadTargets();
  return JSON.stringify({ data, targets }, null, 2);
};

export const importData = (jsonString: string): boolean => {
  try {
    const imported = JSON.parse(jsonString);
    if (imported.data) {
      saveTrackerData(imported.data);
    }
    if (imported.targets) {
      saveTargets(imported.targets);
    }
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDayStatus = (entry: DayEntry | null, targets: Targets | null): 'none' | 'good' | 'over' => {
  if (!entry || !targets) return 'none';
  
  const caloriesOver = entry.calories > targets.maxCalories;
  const carbsOver = entry.carbs > targets.maxCarbs;
  
  if (caloriesOver || carbsOver) return 'over';
  return 'good';
};
