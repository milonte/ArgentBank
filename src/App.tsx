
import './styles/main.css';
import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useSecurityAuth } from './hooks/useSecurityAuth';


/**
 * Default App function
*/
export default function App(): ReactElement {

  // Global Navigation security Hook
  useSecurityAuth()

  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}