export type DayEntry = {
  date: string; // "YYYY-MM-DD"
  calories: number;
  carbs: number;
};

export type Targets = {
  minCalories: number;
  maxCalories: number;
  minCarbs: number;
  maxCarbs: number;
};

export type TrackerData = {
  [date: string]: DayEntry;
};
