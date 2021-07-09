import axios from "axios";
import { headers } from "./config";

const route = "/api/session";

export default class AuthService {
    // get current session
    static async getSession() {
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

    // log current user in after CAS auth
    static async login(token) {
        const expiration_date = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", "Token " + token);
        localStorage.setItem("expiration_date", expiration_date);
    }

    // log current user out
    static async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration_date");
        try {
            await axios.get("/api/endsession");
            return {
                user: null,
                is_authenticated: false,
                error: null,
            };
        } catch (e) {
            return {
                user: null,
                is_authenticated: false,
                error: e.response,
            };
        }
    }
}
