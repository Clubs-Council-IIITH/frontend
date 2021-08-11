import axios from "axios";

import { JSONtoFormData } from "utils/FormUtil";

import EventModel from "models/EventModel";

const endpoint = "/api/events";

const headers = {};

export default class EventService {
    // get all events
    static async getEvents() {
        try {
            var res = await axios.get(`${endpoint}/`, { headers });
            return res.data.map((o) => new EventModel(o));
        } catch (e) {
            throw e.response;
        }
    }

    // get events of a club
    static async getEventsByClubId(club) {
        try {
            var res = await axios.get(`${endpoint}/`, { headers, params: { club } });
            return res.data.map((o) => new EventModel(o));
        } catch (e) {
            throw e.response;
        }
    }

    // get event with id
    static async getEventById(id) {
        try {
            var res = await axios.get(`${endpoint}/`, { headers, params: { id } });
            return new EventModel(res.data[0]);
        } catch (e) {
            throw e.response;
        }
    }

    // add new event
    static async addEvent(data) {
        try {
            var res = await axios.post(`${endpoint}/new/`, JSONtoFormData(data), { headers });
            return res.data;
        } catch (e) {
            throw e.response;
        }
    }

    // update existing event
    static async updateEvent(id, data) {
        try {
            var res = await axios.post(`${endpoint}/edit/${id}/`, JSONtoFormData(data), {
                headers,
            });
            return res.data;
        } catch (e) {
            throw e.response;
        }
    }

    // delete event
    static async deleteEvent(id) {
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
