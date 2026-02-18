'use client';

import { useState, useEffect } from 'react';
import { DayEntry } from '../types';
import { getDayEntry, saveDayEntry, deleteDayEntry, formatDate } from '../utils';

type EditDayModalProps = {
  date: string;
  onClose: () => void;
  onUpdate: () => void;
};

export default function EditDayModal({ date, onClose, onUpdate }: EditDayModalProps) {
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    const entry = getDayEntry(date);
    if (entry) {
      setCalories(entry.calories.toString());
      setCarbs(entry.carbs.toString());
    }
  }, [date]);
  
  const handleSave = () => {
    const caloriesNum = parseFloat(calories) || 0;
    const carbsNum = parseFloat(carbs) || 0;
    
    const entry: DayEntry = {
      date,
      calories: caloriesNum,
      carbs: carbsNum,
    };
    
    saveDayEntry(entry);
    onUpdate();
    onClose();
  };
  
  const handleDelete = () => {
    deleteDayEntry(date);
    onUpdate();
    onClose();
  };
  
  const handleCopyFromPrevious = () => {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() - 1);
    const previousDate = formatDate(dateObj);
    const previousEntry = getDayEntry(previousDate);
    
    if (previousEntry) {
      setCalories(previousEntry.calories.toString());
      setCarbs(previousEntry.carbs.toString());
    } else {
      alert('No data found for the previous day');
    }
  };
  
  const handleReset = () => {
    if (confirm('Are you sure you want to clear this day\'s data?')) {
      setCalories('');
      setCarbs('');
    }
  };
  
  const dateObj = new Date(date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Day</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{formattedDate}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
              placeholder="Enter calories"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Carbs (g)</label>
            <input
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
              placeholder="Enter carbs"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleCopyFromPrevious}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
            >
              Copy from Previous
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
            >
              Reset
            </button>
          </div>
          
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            
            {showDeleteConfirm ? (
              <div className="flex gap-2 flex-1">
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
