import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { UserInterface } from "../models/UserInterface";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

/**
 * Navbar Component
 * @returns ReactElement
 */
export default function Navbar(): ReactElement {

    const dispatch: AppDispatch = useDispatch()
    const navigate: NavigateFunction = useNavigate()
    const user: UserInterface = useSelector((state: RootState) => state.user)
    const rememberedUser: UserInterface | null = document.cookie ?
        JSON.parse(document.cookie.split("=")[1]) : null;

    // Need this to update user name on navbar when user updated
    /* const [userToken, setUserToken] = useState<string | null>('')
    useEffect(() => {
        // If an User is connected, set his token, else set null
        setUserToken(user.token || null)
    }, [user]) */

    /**
     * Handle Logout click button
     * Logout User, remove cookies and return to Login page
     */
    const handleLogout = () => {
        if (rememberedUser) {
            document.cookie = 'USER=;Max-Age=-99999999;'
        }
        dispatch(logout())
        navigate('/', { replace: true })
    }

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to={'/'}>
                <img
                    className="main-nav-logo-image"
                    src="../../images/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {user.token ?
                    <>
                        <Link className="main-nav-item" to={'/profile'}>
                            <i className="fa fa-user-circle"></i>
                            {user.firstName}
                        </Link>
                        <button className="main-nav-item logout-btn" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </button>
                    </>
                    :
                    <Link className="main-nav-item" to={'/login'}>
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>}

            </div>
        </nav>
    )
}