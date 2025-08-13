import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchCurrentUser } from './store/authSlice';

import NavigationBar from './components/NavigationBar';
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><UserListPage /></PrivateRoute>} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;