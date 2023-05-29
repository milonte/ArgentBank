import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: null,
        firstName: null,
        lastName: null,
        token: null,
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            if (action.payload.error) {
                state.error = action.payload.error
            } else {
                state.error = null;
                state.token = action.payload.token;
            }
        },
        logout: (state) => {
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.token = null;
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer;