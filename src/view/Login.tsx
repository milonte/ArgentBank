import { useNavigate } from "react-router-dom";
import { PostUserCredits } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function Login() {
    const user = useSelector((state: any) => state.user)
    const dispatcher = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user.isConnected) {
            navigate('/profile')
        }
    }, [user])

    function HandleSubmit(e: any) {
        e.preventDefault()
        const form = e.target;
        const email: string = form.elements[0].value;
        const password: string = form.elements[1].value;
        PostUserCredits(email, password, dispatcher)
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
                        <div className="sign-in-error">{user.error}</div>
                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
        </>
    )
}