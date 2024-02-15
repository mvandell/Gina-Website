import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
import store from "./store";

function storeToken(state, {payload}) {
    state.token = payload.token;
    window.sessionStorage.setItem("token", payload.token);
}

//Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.sessionStorage.getItem("token") ?? null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.login.matchFulfilled, storeToken
        );
        builder.addMatcher(
            api.endpoints.logout.matchFulfilled, (state) => {
                state.token = null;
                window.sessionStorage.removeItem("token");
            }
        );
    }
});

export default authSlice.reducer;
export const {logout} = authSlice.actions;