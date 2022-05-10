import { BaseModel } from "sjs-base-model";
import ClubModel from "./ClubModel";

export default class EventModel extends BaseModel {
    id = "";
    club = ClubModel;
    poster = "";
    datetimeStart = "";
    datetimeEnd = "";
    name = "";
    audience = "";
    state = "";
    mode = "";
    description = "";
    lastEditedBy = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
        if (this.poster === "") {
            this.poster =
                "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";
        }
    }
}
