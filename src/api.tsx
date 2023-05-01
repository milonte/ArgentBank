import { UserInterface } from "./models/UserInterface";
import { login } from "./store/userSlice";

enum RequestMethods { get = 'GET', post = 'POST', put = 'PUT' }

/**
 * Fetch API function
 * @param method 
 * @param route 
 * @param token 
 * @param body 
 * @returns body Response || error Response
 */
const FetchData = async (
    method: RequestMethods,
    route: string,
    token: string | null,
    body: Object | null
) => {
    return await fetch(process.env.REACT_APP_API_URL + route, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Authorization': token ? 'Bearer ' + token : '',
        },
        body: body ? JSON.stringify(body) : null
    })
        .then((res) => res.json())
        .then((json) => {
            if (200 == json.status) {
                return json.body
            } else {
                throw new Error(json.message)
            }
        })
        .catch((err) => {
            return new Response(err.message, {
                status: err.status, statusText: err.message
            })
        })
}

/**
 * POST User creditentials, then return User bearer JWT Token
 * @param email User email
 * @param password User password
 * @param isRemembered: Remember Me checked boolean
 * @param dispatch Redux Dispatcher
 * @returns Promise
*/
const GetUserToken: (
    email: string,
    password: string,
    isRemembered: boolean,
    dispatch: any
) => void = async (email, password, isRemembered, dispatch) => {

    const body = {
        "email": email,
        "password": password
    }

    return await FetchData(RequestMethods.post, 'user/login', null, body)
        .then((data) => {
            const userCredits: UserInterface = {
                'email': email,
                'token': data.token,
                'isConnected': true,
                'error': null
            }
            dispatch(login(userCredits))

            // If remeberMe checkbox is checked
            // Create / update cookies with user token
            if (isRemembered) {
                document.cookie = `USER=${JSON.stringify(userCredits)}`
            }
        })
}

/**
 * POST | Returns User profile
 * @param token JWT User token
 * @returns UserProfile
 */
const GetUserProfile = async (token: string) => {
    return await FetchData(
        RequestMethods.post, 'user/profile', token, null
    )
}

export {
    GetUserToken,
    GetUserProfile
}