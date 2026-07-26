import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DependencyProvider } from './contexts/DependencyProvider';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import './styles/App.css'; // Main app styles

function App() {
  console.log("App component rendering");
  return (
      <DependencyProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  {/* Add more protected routes here */}
                </Route>
                <Route path="*" element={<div><h2>404 - Page Not Found</h2></div>} />
              </Routes>
            </main>
          </div>
        </Router>
      </DependencyProvider>
  );
}

export default App;