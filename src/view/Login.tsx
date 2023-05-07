import { NavigateFunction, useNavigate } from "react-router-dom";
import { GetUserProfile, GetUserToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { UserInterface } from "../models/UserInterface";


/**
 * Login Page
 * @returns ReactElement
 */
export default function Login(): ReactElement {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate: NavigateFunction = useNavigate()
    const dispatcher: AppDispatch = useDispatch()
    const user: UserInterface = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (user && user.token && user.firstName) {
            setTimeout(() => {
                setIsLoading(false)
                navigate('/profile')
            }, 1000)
        } else if (user.error) {
            setIsLoading(false)
        }
    }, [user])

    /**
     * Handle Submit Login Form
     * Get & send datas from login form to Api
     * @param e FormEvent
     */
    function HandleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form: HTMLFormElement = e.currentTarget;
        const formInputs = form.getElementsByTagName("input");
        const email: string = formInputs[0]?.value
        const password: string = formInputs[1]?.value;
        const remember: boolean = formInputs[2]?.checked;

        Promise.resolve(
            GetUserToken(email, password, dispatcher)
        )
            .then(token => {
                GetUserProfile(token, remember, dispatcher)
            })
            .catch(err => console.log(err.message))

        setIsLoading(true)
    }

    return (
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={HandleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label><input type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label><input type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                        </div>
                        {isLoading ? <div className="loading">...</div> : null}
                        <div className="sign-in-error">{user?.error}</div>
                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
        </>
    )
}