import { BaseModel } from "sjs-base-model";

export default class EventModel extends BaseModel {
    club = "";
    datetime = "";
    name = "";
    last_edited_by = "";
    venue = "";
    creator = "";
    audience = "";
    state = "";
    duration = "";
    description = "";
    financial_requirements = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}
