'use client';

import { useState, useEffect } from 'react';
import { loadTrackerData, loadTargets, getDayStatus } from '../utils';
import { DayEntry, Targets } from '../types';

export default function History() {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [targets, setTargets] = useState<Targets | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const data = loadTrackerData();
    const targetsData = loadTargets();
    
    // Convert data object to array and sort by date (newest first)
    const entriesArray = Object.values(data).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    setEntries(entriesArray);
    setTargets(targetsData);
  }, []);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">History</h1>
        
        {entries.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No entries yet. Start tracking your daily intake!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const status = getDayStatus(entry, targets);
              
              const statusBg = {
                none: 'bg-gray-100 dark:bg-gray-800',
                good: 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700',
                over: 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700',
              }[status];
              
              const statusText = {
                none: '',
                good: 'Within Target',
                over: 'Over Target',
              }[status];
              
              const statusColor = {
                none: '',
                good: 'text-green-700 dark:text-green-300',
                over: 'text-red-700 dark:text-red-300',
              }[status];
              
              return (
                <div
                  key={entry.date}
                  className={`${statusBg} rounded-lg shadow-md p-6 border-2`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{formatDate(entry.date)}</h3>
                      {statusText && (
                        <span className={`text-sm font-medium ${statusColor}`}>
                          {statusText}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{entry.calories}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">calories</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl font-bold">{entry.carbs}g</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">carbs</div>
                      </div>
                      
                      {targets && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                          <div>Target: {targets.minCalories}-{targets.maxCalories} cal</div>
                          <div>Target: {targets.minCarbs}-{targets.maxCarbs}g carbs</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
