import { useQuery } from "@apollo/client";
import { GET_SESSION } from "queries/auth";

import UserModel from "models/UserModel";

const endpoint = "/accounts";

export const Login = async () => {
    window.location.href = `${endpoint}/login`;
};

export const Session = () => {
    const { data: response, ...rest } = useQuery(GET_SESSION);

    return {
        data: new UserModel(response?.payload),
        ...rest,
    };
};
