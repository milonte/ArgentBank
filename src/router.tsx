import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./view/Home";
import Login from "./view/Login";
import Profile from "./view/Profile";

/**
 * Create a new Error Response
 * @param message | error message
 * @param code | error statusCode
 * @returns Reponse
 */
const NewErrorResponse = (message: string, code: number): Response => new Response(message, { status: code, statusText: message })

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        //errorElement: <ErrorPage />,
        /* loader: ({ params }) => {
            // If no user specified in params, return error
            if (undefined === params.userId) {
                throw NewErrorResponse("Page non trouvée", 404)
            }
            return true // if an User param is defined, continue

        }, */
        children: [
            {
                index: true,
                element: <Home />,
                /* loader: async ({ params }) => {
                    // Try to call API
                    const data = await Promise.resolve(getUserMainDatas(params.userId || ""))
                        .then((result) => { return result; })
                        // If error is detected, return error 500
                        .catch(err => { throw NewErrorResponse("Une erreur est survenue. Veuillez reesayer ultérieurement", 500) })
                    // If no user found with the given UserId, return error 404
                    if (undefined === data) {
                        throw NewErrorResponse("Aucun utilisateur trouvé", 404)
                    }
                    // If the user is defined and is find, display Dashboard
                    return true;
                } */
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]


    }
]);

export default router;