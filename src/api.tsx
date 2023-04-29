import { login } from "./store/userSlice";


/**
 * POST User creditentials, then return User bearer JWT Token
 * @param email :string
 * @param password :string
 * @returns User token
*/
const PostUserCredits = async (
    email: string,
    password: string,
    isRemembered: boolean,
    dispatch: any
) => {
    return await fetch(process.env.REACT_APP_API_URL + 'user/login', {
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
            if (data.status === 200) {
                const userCredits = {
                    'email': email,
                    'token': data.body.token,
                    'isConnected': true
                }
                dispatch(login(userCredits))
                if (isRemembered) {
                    document.cookie = `USER=${JSON.stringify(userCredits)}`
                }
                return data;
            } else if (data.status === 400) {
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