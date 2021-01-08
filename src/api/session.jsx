import { useReducer, useCallback } from "react";
import axios from "axios";
import "config";

export const headers = () => ({
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token") || null,
});

export const initial = {
    is_authenticated: false,
    user: {
        name: null,
        group: null,
    },
    error: null,
};

export const HandleLogin = async () => {
    const search = window.location.search;
    const token = search.split("&")[0].substring(7);

    if (token) {
        // expire the token after 1 week
        const expiration_date = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

        localStorage.setItem("token", "Token " + token);
        localStorage.setItem("expiration_date", expiration_date);

        window.location.href = "/";
    }
};

export const HandleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration_date");

    const res = await axios.get("/api/endsession");
    if (res.status === 200) window.location.href = res.data.logout_url;
};

const reducer = (state = initial, { type, response } = {}) => {
    switch (type) {
        case "LOGIN":
            window.location.replace(global.config.loginUrl);
            return state;
        case "AUTOLOGIN":
            HandleLogin();
            return {
                ...state,
                is_authenticated: response.is_authenticated,
                user: response.user,
            };
        case "LOGOUT":
            HandleLogout();
            return {
                ...state,
                is_authenticated: false,
                user: initial.user,
            };
        case "ERROR":
            return {
                ...state,
                is_authenticated: false,
                user: initial.user,
                error: response,
            };
        default:
            return state;
    }
};

export const ManageSession = () => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async () => {
        try {
            const response = await axios.get("/api/session", { headers: headers() });
            dispatch({ type: "AUTOLOGIN", response: response.data });
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error.data });
        }
    }, []);

    return [state, makeRequest, dispatch];
};
