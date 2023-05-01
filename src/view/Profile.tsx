import { ReactElement, useEffect, useState } from "react";
import { UserInterface } from "../models/UserInterface";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { GetUserProfile } from "../api";

/**
 * User Profile page
 * @returns ReactElement
 */
export default function Profile(): ReactElement {
    const [userProfile, setUserProfile] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const user: UserInterface = useSelector((state: RootState) => state.user)

    useEffect(() => {

        async function fetchData(token: string) {
            const profileResponse = await GetUserProfile(token)
            setUserProfile(profileResponse)
        }

        if (user.token && !userProfile) {
            fetchData(user.token)
        }

        if (userProfile && userProfile.firstName) {
            setIsLoading(false)
        }
    }, [userProfile])

    return (
        <>
            <main className="main bg-dark">
                {isLoading ? null :
                    <>
                        <div className="header">
                            <h1>Welcome back<br />{userProfile?.firstName} {userProfile?.lastName}</h1>
                            <button className="edit-button">Edit Name</button>
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