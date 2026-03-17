import React, { useState } from 'react';
import { Login } from './components/Login';
import { MainDashboard } from './components/MainDashboard';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="max-w-md w-full bg-white/90 rounded-2xl border border-cyan-200 p-6 text-center">
            <p className="text-cyan-700 text-xl font-semibold mb-2">Something went wrong</p>
            <p className="text-gray-600 mb-4">Try reloading the page or returning to login.</p>
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => location.reload()} className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-500 text-white">Reload</button>
              <a href="/" className="px-4 py-2 rounded-xl bg-white border border-cyan-200 text-cyan-700">Go Home</a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <MainDashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    </ErrorBoundary>
  );
}
