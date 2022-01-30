import { BaseModel } from "sjs-base-model";
import ClubModel from "./ClubModel";

export default class EventModel extends BaseModel {
    id = "";
    club = ClubModel;
    poster = "";
    start = "";
    end = "";
    name = "";
    venue = "";
    audience = "";
    state = "";
    description = "";
    last_edited_by = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}
