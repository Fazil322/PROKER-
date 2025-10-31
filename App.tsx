
import React from 'react';
import HomePage from './pages/HomePage.tsx';
import { useData } from './context/DataContext.tsx';
import AdminPanel from './components/admin/AdminPanel.tsx';
import Login from './components/Login.tsx';
import ToastContainer from './components/ui/ToastContainer.tsx';
import Chatbot from './components/Chatbot.tsx';

function App() {
  const { isLoggedIn, showLogin } = useData();

  return (
    <>
      <HomePage />
      {isLoggedIn && <AdminPanel />}
      {showLogin && <Login />}
      <ToastContainer />
      <Chatbot />
    </>
  );
}

export default App;