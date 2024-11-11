import React from 'react';
import { AlertTriangle, CheckCircle, Copy, ExternalLink, Search, Shield } from 'lucide-react';

interface AnalysisResult {
  credibilityScore: number;
  warningFlags: string[];
  suggestions: string[];
}

export default function NewsAnalyzer() {
  const [newsText, setNewsText] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  const analyzeText = () => {
    setIsAnalyzing(true);
    // Simulated analysis - in production, this would call an API
    setTimeout(() => {
      setResult({
        credibilityScore: Math.random() * 100,
        warningFlags: [
          'Multiple exclamation marks detected',
          'Emotional language detected',
          'Missing source citations'
        ],
        suggestions: [
          'Verify the source credentials',
          'Cross-reference with fact-checking websites',
          'Check publication date and context'
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="relative">
        <textarea
          className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
          placeholder="Paste the news article or suspicious text here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
        />
        <button
          onClick={() => navigator.clipboard.readText().then(text => setNewsText(text))}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          title="Paste from clipboard"
        >
          <Copy size={20} />
        </button>
      </div>

      <button
        onClick={analyzeText}
        disabled={!newsText.trim() || isAnalyzing}
        className={`w-full py-4 px-6 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transition-all ${
          !newsText.trim() || isAnalyzing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Search size={20} />
        <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Text'}</span>
      </button>

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Credibility Score</h3>
              <div className="flex items-center space-x-2">
                <Shield className="text-blue-600" />
                <span className="text-2xl font-bold">{result.credibilityScore.toFixed(1)}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  result.credibilityScore > 70
                    ? 'bg-green-600'
                    : result.credibilityScore > 40
                    ? 'bg-yellow-500'
                    : 'bg-red-600'
                }`}
                style={{ width: `${result.credibilityScore}%` }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="text-red-500" />
                <h3 className="text-xl font-semibold">Warning Flags</h3>
              </div>
              <ul className="space-y-3">
                {result.warningFlags.map((flag, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-700">
                    <span className="text-red-500">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="text-green-500" />
                <h3 className="text-xl font-semibold">Suggestions</h3>
              </div>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-700">
                    <span className="text-green-500">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-blue-800">
              <ExternalLink size={16} />
              <span>
                Pro tip: Always verify information from multiple reliable sources and fact-checking
                websites.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}