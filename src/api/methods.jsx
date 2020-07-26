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
        const res = await axios.get("/session/", { headers });
        console.log(res);
        return res;
    },

    view: async (model, params) => {
        fetchToken();
        const res = await axios.get("/api/" + model + "/", { params, headers });
        console.log(res);
        return res;
    },

    new: async (model, data) => {
        fetchToken();
        const res = await axios.post("/api/" + model + "/new/", data, { headers });
        console.log(res);
        return res;
    },

    edit: async (model, id, data) => {
        fetchToken();
        const res = await axios.post("/api/" + model + "/edit/" + id + "/", data, { headers });
        console.log(res);
        return res;
    },

    delete: async (model, id) => {
        fetchToken();
        const res = await axios.post(
            "/api/" + model + "/delete/" + id + "/",
            {},
            { headers: { Authorization: headers.Authorization } }
        );
        console.log(res);
        return res;
    },
};
