import axios from "axios";

import { headers } from "./config";

import { JSONtoFormData } from "utils/FormUtil";

import ClubModel from "models/ClubModel";

const endpoint = "/api/clubs";

export default class ClubService {
    // get all clubs
    static async getClubs() {
        try {
            var res = await axios.get(`${endpoint}/`, { headers });
            return res.data.map((o) => new ClubModel(o));
        } catch (e) {
            throw e.response;
        }
    }

    // get club with id
    static async getClubById(id) {
        try {
            var res = await axios.get(`${endpoint}/`, { headers, params: { id } });
            return new ClubModel(res.data[0]);
        } catch (e) {
            throw e.response;
        }
    }

    // add new club
    static async addClub(data) {
        try {
            var res = await axios.post(`${endpoint}/new/`, JSONtoFormData(data), { headers });
            return res.data;
        } catch (e) {
            throw e.response;
        }
    }

    // update existing club
    static async updateClub(id, data) {
        try {
            var res = await axios.post(`${endpoint}/edit/${id}/`, JSONtoFormData(data), {
                headers,
            });
            return res.data;
        } catch (e) {
            throw e.response;
        }
    }

    // delete club
    static async deleteClub(id) {
        try {
            var res = await axios.post(
                `${endpoint}/delete/${id}/`,
                {},
                { headers: { Authorization: headers.Authorization } }
            );
            return res.data;
        } catch (e) {
            throw e.response;
        }
    }
}
