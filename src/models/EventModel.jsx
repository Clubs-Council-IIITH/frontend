import { BaseModel } from "sjs-base-model";
import ClubModel from "./ClubModel";

export default class EventModel extends BaseModel {
    id = "";
    club = ClubModel;
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
