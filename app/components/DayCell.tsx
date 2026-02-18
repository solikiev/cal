'use client';

import { DayEntry, Targets } from '../types';
import { getDayStatus } from '../utils';

type DayCellProps = {
  date: Date;
  entry: DayEntry | null;
  targets: Targets | null;
  onClick: () => void;
};

export default function DayCell({ date, entry, targets, onClick }: DayCellProps) {
  const status = getDayStatus(entry, targets);
  const isToday = new Date().toDateString() === date.toDateString();
  
  const bgColor = {
    none: 'bg-gray-100 dark:bg-gray-800',
    good: 'bg-green-100 dark:bg-green-900',
    over: 'bg-red-100 dark:bg-red-900',
  }[status];
  
  const textColor = {
    none: 'text-gray-400 dark:text-gray-600',
    good: 'text-green-800 dark:text-green-100',
    over: 'text-red-800 dark:text-red-100',
  }[status];
  
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} p-2 rounded-lg border-2 ${
        isToday ? 'border-blue-500' : 'border-transparent'
      } hover:border-gray-400 transition-colors min-h-20 flex flex-col items-center justify-center text-center`}
    >
      <div className="font-bold text-lg">{date.getDate()}</div>
      {entry && (
        <div className="text-xs mt-1">
          <div>{entry.calories}cal</div>
          <div>{entry.carbs}g</div>
        </div>
      )}
    </button>
  );
}
