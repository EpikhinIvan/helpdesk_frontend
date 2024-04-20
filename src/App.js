import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import RequestsPage from './pages/RequestsPage/RequestsPage';
import AddRequestPage from './pages/AddRequestPage/AddRequestPage';

const App = () => {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/requests" element={<RequestsPage/>} />
            <Route path="/add-request" element={<AddRequestPage/>} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;

