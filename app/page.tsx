'use client';

import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EditDayModal from './components/EditDayModal';
import { loadTrackerData, loadTargets } from './utils';
import { TrackerData, Targets } from './types';

export default function Home() {
  const [data, setData] = useState<TrackerData>({});
  const [targets, setTargets] = useState<Targets | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    loadData();
  }, []);
  
  const loadData = () => {
    setData(loadTrackerData());
    setTargets(loadTargets());
  };
  
  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };
  
  const handleCloseModal = () => {
    setSelectedDate(null);
  };
  
  const handleUpdate = () => {
    loadData();
  };
  
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-2">Cal Tracker</h1>
        
        {!targets && (
          <div className="max-w-md mx-auto mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ No targets set. Go to <a href="/settings" className="underline font-bold">Settings</a> to set your daily targets.
            </p>
          </div>
        )}
        
        <Calendar
          data={data}
          targets={targets}
          onDayClick={handleDayClick}
        />
        
        {selectedDate && (
          <EditDayModal
            date={selectedDate}
            onClose={handleCloseModal}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </main>
  );
}
