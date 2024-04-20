import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import HomePage from './components/HomePage/HomePage';



const App = () => {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div> 
          
      </Router>
  );
};

export default App;

