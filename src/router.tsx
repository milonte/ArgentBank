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

        children: [
            {
                index: true,
                element: <Home />,
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