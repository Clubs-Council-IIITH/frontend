import { BaseModel } from "sjs-base-model";

export default class ClubModel extends BaseModel {
    id = "";
    img = "";
    name = "";
    mail = "";
    website = "";
    state = "";
    description = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
        this.description =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
    }
}
