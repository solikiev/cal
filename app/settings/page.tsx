'use client';

import { useState, useEffect } from 'react';
import { loadTargets, saveTargets } from '../utils';
import { Targets } from '../types';
import DataManagement from '../components/DataManagement';

export default function Settings() {
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minCarbs, setMinCarbs] = useState('');
  const [maxCarbs, setMaxCarbs] = useState('');
  const [saved, setSaved] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const targets = loadTargets();
    if (targets) {
      setMinCalories(targets.minCalories.toString());
      setMaxCalories(targets.maxCalories.toString());
      setMinCarbs(targets.minCarbs.toString());
      setMaxCarbs(targets.maxCarbs.toString());
    }
  }, []);
  
  const handleSave = () => {
    const targets: Targets = {
      minCalories: parseFloat(minCalories) || 0,
      maxCalories: parseFloat(maxCalories) || 0,
      minCarbs: parseFloat(minCarbs) || 0,
      maxCarbs: parseFloat(maxCarbs) || 0,
    };
    
    saveTargets(targets);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  const handleUpdate = () => {
    // Reload page to refresh data
    window.location.reload();
  };
  
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Daily Targets</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Min Calories</label>
                <input
                  type="number"
                  value={minCalories}
                  onChange={(e) => setMinCalories(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 1500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Calories</label>
                <input
                  type="number"
                  value={maxCalories}
                  onChange={(e) => setMaxCalories(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 2000"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Min Carbs (g)</label>
                <input
                  type="number"
                  value={minCarbs}
                  onChange={(e) => setMinCarbs(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Carbs (g)</label>
                <input
                  type="number"
                  value={maxCarbs}
                  onChange={(e) => setMaxCarbs(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 150"
                />
              </div>
            </div>
            
            <button
              onClick={handleSave}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              {saved ? '✓ Saved!' : 'Save Targets'}
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set your daily target ranges for calories and carbs. Days where your actual intake stays within or below these targets will be marked in green on the calendar.
            </p>
          </div>
        </div>
        
        <DataManagement onUpdate={handleUpdate} />
      </div>
    </main>
  );
}
