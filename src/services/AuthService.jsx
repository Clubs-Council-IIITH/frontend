import axios from "axios";
import { headers } from "./config";

import { loginUrl } from "constants/authUrls";

const route = "/api/session";

export default class AuthService {
    // get current session
    static async getSession() {
        const search = window.location.search;
        const token = search.split("&")[0].substring(7);

        if (token) {
            // if CAS auth token received
            this.login(token);
        } else {
            // query session from server
            try {
                var res = await axios.get(`${route}/`, { headers });
                return {
                    user: res.data.user,
                    is_authenticated: res.data.is_authenticated,
                    error: null,
                };
            } catch (e) {
                localStorage.removeItem("token");
                localStorage.removeItem("expiration_date");
                return {
                    user: null,
                    is_authenticated: false,
                    error: e.response,
                };
            }
        }
    }

    // log current user in after CAS auth
    static async login(token = null) {
        // if called without token, redirect to CAS
        if (!token) {
            window.location.href = loginUrl;
        } else {
            // expire the token after 1 week
            const expiration_date = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

            localStorage.setItem("token", `Token ${token}`);
            localStorage.setItem("expiration_date", expiration_date);

            window.location.href = "/";
        }
    }

    // log current user out
    static async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration_date");

        var res = await axios.get("/api/endsession");
        if (res.status === 200) window.location.href = res.data.logout_url;
    }
}
