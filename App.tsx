
import React from 'react';
// FIX: Add .tsx extension to file import.
import HomePage from './pages/HomePage.tsx';
// FIX: Add .tsx extension to file import.
import { useData } from './context/DataContext.tsx';
// FIX: Add .tsx extension to file import.
import AdminPanel from './components/admin/AdminPanel.tsx';
// FIX: Add .tsx extension to file import.
import Login from './components/Login.tsx';
// FIX: Add .tsx extension to file import.
import ToastContainer from './components/ui/ToastContainer.tsx';

function App() {
  const { isLoggedIn, showLogin } = useData();

  return (
    <>
      <HomePage />
      {isLoggedIn && <AdminPanel />}
      {showLogin && <Login />}
      <ToastContainer />
    </>
  );
}

export default App;
