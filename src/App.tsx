
import './styles/main.css';
import { Location, NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ReactElement, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/userSlice';
import { UserInterface } from './models/UserInterface';
import type { RootState, AppDispatch } from './store/store'


/**
 * Default App function
*/
export default function App(): ReactElement {
  const dispatch: AppDispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()
  const location: Location = useLocation()
  const user: UserInterface = useSelector((state: RootState) => state.user)

  // Get the current pathname
  const pathname: string = location.pathname;

  // Get the current user registered in cookies
  const rememberedUser: UserInterface | null = document.cookie ?
    JSON.parse(document.cookie.split("=")[1]) : null;

  // Routes protected by an authentication
  const authRequiredRoutes: string[] = [
    "/profile",
  ]

  useEffect(() => {
    // If an user is registred in cookies, then store him 
    // And redirect user to dthe default authentified page
    if ("/login" === pathname && rememberedUser && rememberedUser.token) {
      dispatch(login(rememberedUser))
      navigate('/profile', { replace: true })
    }

    // Back to the Login page if no user in protected route
    if (authRequiredRoutes.includes(pathname) && !user.token) {
      navigate('/login', { replace: true })
    }
    // Redirect to the default authentified page (profile) if user logged
    else if ("/login" === pathname && user.token) {
      navigate('/profile', { replace: true })
    }
  }, [pathname])


  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}