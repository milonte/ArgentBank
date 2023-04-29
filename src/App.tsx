
import './styles/main.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ReactElement, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/userSlice';


/**
 * Default App function
*/
export default function App(): ReactElement {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state: any) => state.user)

  // Get the current pathname
  const pathname = location.pathname;
  // Get the current user registered in cookies
  const rememberedUser = document.cookie ? JSON.parse(document.cookie.split("=")[1]) : null;
  // Routes protected by an authentication
  const authRequiredRoutes = [
    "/profile",
  ]

  useEffect(() => {
    // If an user is registred in cookies, then store him 
    if (rememberedUser && rememberedUser.isConnected) {
      dispatch(login(rememberedUser))
    }
    // Back to the Login page if no user in protected route
    if (authRequiredRoutes.includes(pathname) && !user.isConnected) {
      navigate('/login', { replace: true })
    }
    // Redirect to the default authentified page (profile) if user logged
    else if ("/login" === pathname && user.isConnected) {
      navigate('/profile', { replace: true })
    }
  }, [pathname, user])


  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}