import { FormEvent, ReactElement, useEffect, useState } from "react";
import { UserInterface } from "../models/UserInterface";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { UpdateUserProfile } from "../api";
import { useDispatch } from "react-redux";

/**
 * User Profile page
 * @returns ReactElement
 */
export default function Profile(): ReactElement {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dispatcher: AppDispatch = useDispatch()
    const user: UserInterface = useSelector((state: RootState) => state.user)



    useEffect(() => {

        if (user && user.firstName) {
            setIsLoading(false)
        }
    }, [user])

    /**
     * Show Form for updating user names
     * Hide Edit Button
     * @param e FormEvent
     */
    function displayUpdateForm() {
        document.getElementById("update-form")?.removeAttribute('hidden')
        document.getElementById("username-header")?.setAttribute('hidden', 'true')
        document.getElementById("edit-button")?.setAttribute('hidden', 'true')
    }

    /**
     * Hide Form for updating user names
     * Show Edit button
     */
    function hideUpdateForm() {
        document.getElementById("update-form")?.setAttribute('hidden', 'true')
        document.getElementById("username-header")?.removeAttribute('hidden')
        document.getElementById("edit-button")?.removeAttribute('hidden')
    }

    /**
     * Update user profile on submit form
     * @param e FormEvent
     */
    function handleSubmitUpdateUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form: HTMLFormElement = e.currentTarget;
        const formInputs = form.getElementsByTagName("input");
        const firstName: string = formInputs[0]?.value
        const lastName: string = formInputs[1]?.value;

        if (user.token) {
            UpdateUserProfile(user, firstName, lastName, dispatcher)
            form.reset()
            hideUpdateForm();
        }
    }

    return (
        <>
            <main className="main bg-dark">
                {isLoading ? null :
                    <>
                        <div className="header">
                            <h1>Welcome back<br />
                                <span id="username-header">{user?.firstName} {user?.lastName}</span>
                            </h1>
                            <button id='edit-button' className="edit-button" onClick={displayUpdateForm}>Edit Name</button>
                            <form id="update-form" onSubmit={handleSubmitUpdateUser} onReset={hideUpdateForm} hidden>
                                <div className="form-inputs">
                                    <input id="firstName" required minLength={3} placeholder={user.firstName || ''} />
                                    <input id="lastName" required minLength={3} placeholder={user.lastName || ''} />
                                </div>
                                <div className="form-buttons">
                                    <button className="update-form-button" type="submit">Save</button>
                                    <button className="update-form-button" type="reset">Cancel</button>
                                </div>
                            </form>
                        </div>
                        <h2 className="sr-only">Accounts</h2>
                        <section className="account">
                            <div className="account-content-wrapper">
                                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                                <p className="account-amount">$2,082.79</p>
                                <p className="account-amount-description">Available Balance</p>
                            </div>
                            <div className="account-content-wrapper cta">
                                <button className="transaction-button">View transactions</button>
                            </div>
                        </section>
                        <section className="account">
                            <div className="account-content-wrapper">
                                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                                <p className="account-amount">$10,928.42</p>
                                <p className="account-amount-description">Available Balance</p>
                            </div>
                            <div className="account-content-wrapper cta">
                                <button className="transaction-button">View transactions</button>
                            </div>
                        </section>
                        <section className="account">
                            <div className="account-content-wrapper">
                                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                                <p className="account-amount">$184.30</p>
                                <p className="account-amount-description">Current Balance</p>
                            </div>
                            <div className="account-content-wrapper cta">
                                <button className="transaction-button">View transactions</button>
                            </div>
                        </section>
                    </>
                }
            </main>

        </>
    )
}