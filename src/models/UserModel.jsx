import { BaseModel } from "sjs-base-model";

export default class UserModel extends BaseModel {
    id = "";
    username = "";
    group = "";
    isAuthenticated = false;
    props = {};

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}
