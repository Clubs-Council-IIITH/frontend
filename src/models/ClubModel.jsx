import { BaseModel } from "sjs-base-model";

export default class ClubModel extends BaseModel {
    id = "";
    img = "";
    name = "";
    mail = "";
    website = "";
    state = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}