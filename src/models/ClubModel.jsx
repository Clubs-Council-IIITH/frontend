import { BaseModel } from "sjs-base-model";

export default class ClubModel extends BaseModel {
    id = "";
    img = "";
    name = "";
    mail = "";
    website = "";
    category = "";
    state = "";
    tagline = "";
    description = "";
    instagram = "";
    facebook = "";
    youtube = "";
    twitter = "";
    linkedin = "";
    discord = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}
