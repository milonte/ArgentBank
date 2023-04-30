import { UserInterface } from "./models/UserInterface";
import { login } from "./store/userSlice";

/**
 * POST User creditentials, then return User bearer JWT Token
 * @param email User email
 * @param password User password
 * @param isRemembered: Remember Me checked boolean
 * @param dispatch Redux Dispatcher
 * @returns Promise
*/
const PostUserCredits: (
    email: string,
    password: string,
    isRemembered: boolean,
    dispatch: any
) => void = async (email, password, isRemembered, dispatch) => {

    await fetch(process.env.REACT_APP_API_URL + 'user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then((res) => res.json())
        .then((data) => {

            // If response is OK
            // Set user token into redux store
            if (data.status === 200) {
                const userCredits: UserInterface = {
                    'email': email,
                    'token': data.body.token,
                    'isConnected': true,
                    'error': null
                }
                dispatch(login(userCredits))

                // If remeberMe checkbox is checked
                // Create / update cookies with user token
                if (isRemembered) {
                    document.cookie = `USER=${JSON.stringify(userCredits)}`
                }

            }
            // If response in not OK (error send from API)
            // Set the error message into redux store
            // (used from display error message in login form)
            else {
                dispatch(login({
                    'error': data.message
                }))
            }

        })
        .catch((err) => { console.log(err) })
}


export {
    PostUserCredits,
}