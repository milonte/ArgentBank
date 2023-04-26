import { useDispatch, useSelector } from "react-redux"
import { login } from "./store/userSlice";
import { store } from "./store/store";



/**
 * POST User creditentials, then return User bearer JWT Token
 * @param email :string
 * @param password :string
 * @returns User token
*/
const PostUserCredits = async (email: string, password: string, dispatch: any) => {
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
                dispatch(
                    login({
                        'email': email,
                        'token': data.body.token,
                        'isConnected': true
                    }))
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