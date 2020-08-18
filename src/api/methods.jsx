import axios from "axios";

const headers = {
    Authorization: localStorage.getItem("token"),
    "Content-Type": "multipart/form-data",
};

function fetchToken() {
    headers.Authorization = localStorage.getItem("token") || null;
}

export default {
    login: async (props) => {
        const token = props.location.search.split("&")[0].substring(7);
        const expiration_date = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", "Token " + token);
        localStorage.setItem("expiration_date", expiration_date);
    },

    logout: async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration_date");
    },

    session: async () => {
        try {
            const res = await axios.get("/session/", { headers });
            return res;
        } catch (err) {
            localStorage.removeItem("token");
            localStorage.removeItem("expiration_date");
            return { usergroup: null, is_authenticated: false };
        }
    },

    view: async (model, params) => {
        fetchToken();
        if (!headers.Authorization) return await axios.get("/api/" + model + "/", { params });
        try {
            return await axios.get("/api/" + model + "/", { params, headers });
        } catch (err) {
            return err.response;
        }
    },

    new: async (model, data) => {
        fetchToken();
        try {
            return await axios.post("/api/" + model + "/new/", data, { headers });
        } catch (err) {
            return err.response;
        }
    },

    edit: async (model, id, data) => {
        fetchToken();
        try {
            return await axios.post("/api/" + model + "/edit/" + id + "/", data, { headers });
        } catch (err) {
            return err.response;
        }
    },

    delete: async (model, id) => {
        fetchToken();
        try {
            return await axios.post(
                "/api/" + model + "/delete/" + id + "/",
                {},
                { headers: { Authorization: headers.Authorization } }
            );
        } catch (err) {
            return err.response;
        }
    },
};
