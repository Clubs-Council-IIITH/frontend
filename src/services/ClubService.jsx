import { useQuery, useMutation } from "@apollo/client";
import {
    GET_ALL_CLUBS,
    GET_CLUB_BY_ID,
    CREATE_CLUB,
    UPDATE_CLUB,
    DELETE_CLUB,
} from "queries/clubs";

import ClubModel from "models/ClubModel";

// get all clubs
export const GetAllClubs = () => {
    const { data: response, ...rest } = useQuery(GET_ALL_CLUBS);
    return {
        data: response?.clubs?.map((o) => new ClubModel(o)),
        ...rest,
    };
};

// get specific club with id
export const GetClubById = (id) => {
    const { data: response, ...rest } = useQuery(GET_CLUB_BY_ID, { variables: { id } });
    return {
        data: new ClubModel(response?.club),
        ...rest,
    };
};

// add new club
export const CreateClub = (data) => {
    const [executeCreate, { data: response, ...rest }] = useMutation(CREATE_CLUB);
    executeCreate({ variables: { clubData: data } });
    return {
        data: new ClubModel(response?.club),
        ...rest,
    };
};

// update existing club
export const UpdateClub = (id, data) => {
    const [executeUpdate, { data: response, ...rest }] = useMutation(UPDATE_CLUB);
    executeUpdate({ variables: { clubData: { ...data, id } } });
    return {
        data: new ClubModel(response?.club),
        ...rest,
    };
};

// delete club
export const DeleteClub = (id) => {
    const [executeDelete, { data: response, ...rest }] = useMutation(DELETE_CLUB);
    executeDelete({ variables: { clubData: { id } } });
    return {
        data: new ClubModel(response?.club),
        ...rest,
    };
};
