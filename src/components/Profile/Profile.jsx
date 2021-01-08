import { useState, useContext } from "react";
import { Button } from "reactstrap";

import { SessionContext } from "App";

import loginIcon from "./assets/login.svg";
import caretDown from "./assets/caret_down.svg";
import caretUp from "./assets/caret_up.svg";
import "./styles.scss";

const ProfileItem = ({ user, dispatchSession }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <div className="text-light profile-item-name">{user.name.split("@")[0]}</div>
                    <div className="text-secondary profile-item-mail">
                        @{user.name.split("@")[1]}
                    </div>
                </div>
                <Button
                    color="dark"
                    className="rounded-circle profile-btn ml-2"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <img src={collapsed ? caretUp : caretDown} alt="" className="profile-caret" />
                </Button>
            </div>
            <Button
                color="dark"
                className={`mt-3 w-100 ${collapsed && "d-none"}`}
                onClick={() => dispatchSession({ type: "LOGOUT" })}
            >
                LOGOUT
            </Button>
        </div>
    );
};

const Profile = () => {
    const { session, dispatchSession } = useContext(SessionContext);

    return (
        <div className="profile-container p-3 d-flex flex-column justify-content-center">
            {session.is_authenticated ? (
                <ProfileItem user={session.user} dispatchSession={dispatchSession} />
            ) : (
                <Button
                    color="dark"
                    className="w-100 d-flex justify-content-center align-items-center"
                    onClick={() => dispatchSession({ type: "LOGIN" })}
                >
                    <img src={loginIcon} alt="" className="mr-2" />
                    LOGIN
                </Button>
            )}
        </div>
    );
};

export default Profile;
