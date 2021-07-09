import { useEffect } from "react";
import ClubService from "services/ClubService";

const Clubs = () => {
    useEffect(() => {
        (async () => {
            const clubs = await ClubService.getClubs();
            console.log(clubs);
        })();

        (async () => {
            const clubOne = await ClubService.getClub(1);
            console.log("singular", clubOne);
        })();

        (async () => {
            const res = await ClubService.addClub({ name: "c", mail: "lmao@gmail.com" });
            console.log("created", res);
        })();
    }, []);

    return <h1> CLUBS </h1>;
};

export default Clubs;
