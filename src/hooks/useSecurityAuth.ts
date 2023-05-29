import { useEffect } from "react";
import { UserInterface } from "../models/UserInterface";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { Location, useLocation, NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../store/userSlice";

/**
 * Global Navigation Security Hook
 */
export function useSecurityAuth() {
    const dispatch: AppDispatch = useDispatch()
    const navigate: NavigateFunction = useNavigate()
    const location: Location = useLocation()
    const user: UserInterface = useSelector((state: RootState) => state.user)

    // Get the current pathname
    const pathname: string = location.pathname;

    // Routes protected by an authentication
    const AUTH_REQUIRED_ROUTES: string[] = [
        "/profile",
    ]

    const LOGIN_PATH: string = "/login"

    useEffect(() => {
        // If an user is registred in cookies, then store him 
        // And redirect user to dthe default authentified page
        /* if (LOGIN_PATH === pathname && rememberedUser && rememberedUser.token) {
            dispatch(login(rememberedUser))
            navigate("/profile", { replace: true })
        } */

        // Back to the Login page if no user in protected route
        if (AUTH_REQUIRED_ROUTES.includes(pathname) && !user.token) {
            navigate(LOGIN_PATH, { replace: true })
        }
    }, [pathname])
}