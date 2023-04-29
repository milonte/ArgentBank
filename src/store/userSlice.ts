import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isConnected: false,
        email: null,
        token: null,
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            if (action.payload.error) {
                state.error = action.payload.error
            } else {
                state.error = null;
                state.isConnected = true;
                state.token = action.payload.token;
            }
        },
        logout: (state) => {
            state.email = null;
            state.token = null;
            state.isConnected = false;
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer;