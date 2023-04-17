
import './styles/main.css';
import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/**
 * Default App function
 */
export default function App(): ReactElement {

  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}