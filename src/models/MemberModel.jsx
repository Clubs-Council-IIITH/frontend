import { BaseModel } from "sjs-base-model";
import ClubModel from "./ClubModel";
import UserModel from "./UserModel";

export default class MemberModel extends BaseModel {
    id = "";
    user = UserModel;
    club = ClubModel;
    role = "";
    year = "";
    rollno = 0;
    approved = false;

    constructor(data) {
        super();
        this.update(data);
    }

    update(data) {
        super.update(data);
    }
}
