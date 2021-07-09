import axios from "axios";
import { headers } from "./config";

import ClubModel from "models/ClubModel";

const route = "/api/clubs";

export default class ClubService {
    // get all clubs
    static async getClubs() {
        try {
            var res = await axios.get(`${route}/`, { headers });
            return {
                data: res.data.map((o) => new ClubModel(o)),
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }

    // get club with id
    static async getClub(id) {
        try {
            var res = await axios.get(`${route}/`, { headers, params: { id } });
            return {
                data: new ClubModel(res.data[0]),
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }

    // add new club
    static async addClub(data) {
        try {
            var res = await axios.post(`${route}/new/`, data, { headers });
            return {
                data: res.data,
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }

    // update existing club
    static async updateClub(id, data) {
        try {
            var res = await axios.post(`${route}/edit/${id}/`, data, { headers });
            return {
                data: res.data,
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }

    // delete club
    static async deleteClub(id) {
        try {
            var res = await axios.post(
                `${route}/delete/${id}/`,
                {},
                { headers: { Authorization: headers.Authorization } }
            );
            return {
                data: res.data,
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }
}
