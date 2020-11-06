import axios from "axios";

const headers = {
    Authorization: localStorage.getItem("token"),
    "Content-Type": "multipart/form-data",
};

function fetchToken() {
    headers.Authorization = localStorage.getItem("token") || null;
}

export default {
    // redirect to CAS and log the user in
    login: async (props) => {
        const token = props.location.search.split("&")[0].substring(7);

        // expire the token after 1 week
        const expiration_date = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

        localStorage.setItem("token", "Token " + token);
        localStorage.setItem("expiration_date", expiration_date);
    },

    // clear session data from localStorage to log the user out
    logout: async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration_date");
        return await axios.get("/api/endsession");
    },

    // get current session details from the server
    session: async () => {
        try {
            return await axios.get("/api/session/", { headers });
        } catch (err) {
            localStorage.removeItem("token");
            localStorage.removeItem("expiration_date");
            return { usergroup: null, is_authenticated: false };
        }
    },

    // db READ operation
    view: async (model, params) => {
        fetchToken();
        if (!headers.Authorization) return await axios.get("/api/" + model + "/", { params });
        try {
            return await axios.get("/api/" + model + "/", { params, headers });
        } catch (err) {
            return err.response;
        }
    },

    // db CREATE operation
    new: async (model, data) => {
        fetchToken();
        try {
            return await axios.post("/api/" + model + "/new/", data, { headers });
        } catch (err) {
            return err.response;
        }
    },

    // db UPDATE operation
    edit: async (model, id, data) => {
        fetchToken();
        try {
            return await axios.post("/api/" + model + "/edit/" + id + "/", data, { headers });
        } catch (err) {
            return err.response;
        }
    },

    // db DELETE operation
    delete: async (model, id, data = {}) => {
        fetchToken();
        try {
            return await axios.post("/api/" + model + "/delete/" + id + "/", data, {
                headers: { Authorization: headers.Authorization },
            });
        } catch (err) {
            return err.response;
        }
    },
};
