import React from 'react';
import Navbar from '../components/Navbar.jsx';
import HistoryList from '../components/HistoryList.jsx';

export default function History() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Historique des actions</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <HistoryList />
        </div>
      </div>
    </div>
  );
}
