import axios from "axios";
import { headers } from "./config";

import EventModel from "models/EventModel";

const route = "/api/events";

export default class EventService {
    // get all events
    static async getEvents() {
        try {
            var res = await axios.get(`${route}/`, { headers });
            return {
                data: res.data.map((o) => new EventModel(o)),
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }

    // get events of a club
    static async getEventsByClubId(club) {
        try {
            var res = await axios.get(`${route}/`, { headers, params: { club } });
            return {
                data: new EventModel(res.data[0]),
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }

    // get event with id
    static async getEventById(id) {
        try {
            var res = await axios.get(`${route}/`, { headers, params: { id } });
            return {
                data: new EventModel(res.data[0]),
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e.response,
            };
        }
    }

    // add new event
    static async addEvent(data) {
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

    // update existing event
    static async updateEvent(id, data) {
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

    // delete event
    static async deleteEvent(id) {
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
