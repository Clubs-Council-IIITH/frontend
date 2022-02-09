import { BaseModel } from "sjs-base-model";
import ClubModel from "./ClubModel";

export default class EventModel extends BaseModel {
    id = "";
    club = ClubModel;
    poster = "";
    datetimeStart = "";
    datetimeEnd = "";
    name = "";
    venue = "";
    audience = "";
    state = "";
    description = "";
    lastEditedBy = "";
    financialRequirements = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}
