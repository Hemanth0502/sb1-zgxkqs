import React from 'react';
import { Shield } from 'lucide-react';
import NewsAnalyzer from './components/NewsAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Fake News Detective</h1>
          </div>
          <p className="mt-2 text-gray-600">Analyze and verify news content with AI-powered insights</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Content Verification Tool</h2>
            <p className="text-blue-100">
              Paste any suspicious news article or content to analyze its credibility and detect
              potential misinformation.
            </p>
          </div>
          <NewsAnalyzer />
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            This tool uses advanced analysis techniques to help identify potential fake news.
            Always verify information from multiple reliable sources.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;