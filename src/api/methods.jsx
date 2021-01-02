import axios from "axios";

export const headers = () => ({
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token") || null,
});

export const handleView = async (endpoint, params) => {
    if (!headers().Authorization) return await axios.get(endpoint, { params });
    try {
        return await axios.get(endpoint, { params, headers: headers() });
    } catch (err) {
        console.log(err);
        return err.response;
    }
};

export const handleNew = async (endpoint, data) => {
    try {
        return await axios.post(endpoint, data, { headers: headers() });
    } catch (err) {
        return err.response;
    }
};

export const handleEdit = async (endpoint, id, data) => {
    try {
        return await axios.post(`${endpoint}${id}/`, data, { headers: headers() });
    } catch (err) {
        return err.response;
    }
};

export const handleDelete = async (endpoint, id, data = {}) => {
    try {
        return await axios.post(`${endpoint}${id}/`, data, {
            headers: { Authorization: headers().Authorization },
        });
    } catch (err) {
        return err.response;
    }
};
