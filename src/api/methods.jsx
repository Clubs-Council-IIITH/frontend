import { useReducer, useCallback } from "react";
import axios from "axios";

export const headers = () => ({
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token") || null,
});

export const initial = {
    loading: true,
    error: null,
    data: null,
};

const reducer = (state = initial, { type, response } = {}) => {
    switch (type) {
        case "LOADING":
            return { ...state, loading: true };
        case "SUCCESS":
            return { ...state, loading: false, error: false, data: response };
        case "ERROR":
            return { ...state, loading: false, error: response };
        default:
            return state;
    }
};

export const HandleView = (endpoint, params) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async () => {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.get(endpoint, {
                params,
                headers: !headers.Authorization ? headers() : {},
            });
            dispatch({ type: "SUCCESS", response: response.data });
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, [endpoint, params]);

    return [state, makeRequest];
};

export const HandleNew = async (endpoint, data) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async () => {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.post(endpoint, data, { headers: headers() });
            dispatch({ type: "SUCCESS", response: response.data });
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, [endpoint, data]);

    return [state, makeRequest];
};

export const HandleEdit = async (endpoint, id, data) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async () => {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.post(`${endpoint}${id}/`, data, { headers: headers() });
            dispatch({ type: "SUCCESS", response: response.data });
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, [endpoint, id, data]);

    return [state, makeRequest];
};

export const HandleDelete = async (endpoint, id, data = {}) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const makeRequest = useCallback(async () => {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.post(`${endpoint}${id}/`, data, {
                headers: { Authorization: headers().Authorization },
            });
            dispatch({ type: "SUCCESS", response: response.data });
        } catch (err) {
            const error = err.response;
            dispatch({ type: "ERROR", response: error });
        }
    }, [endpoint, id, data]);

    return [state, makeRequest];
};
