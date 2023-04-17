/**
 * POST User creditentials, then return User bearer JWT Token
 * @param username :string
 * @param password :string
 * @returns User token
 */
const postUserCredits = async (username: string, password: string) => {
    return await fetch(process.env.REACT_APP_API_URL + 'user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "email": username,
            "password": password
        })
    })
        .catch(error => error.status)
        .then((resp) => { return resp.json() })
        .then((json) => { return json.body })
}

export {
    postUserCredits,
}