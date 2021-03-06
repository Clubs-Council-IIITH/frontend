import { BaseModel } from "sjs-base-model";

export default class UserModel extends BaseModel {
    id = "";
    img = "";
    firstName = "";
    lastName = "";
    mail = "";
    batch = "";

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}
