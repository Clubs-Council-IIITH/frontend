import PageContainer from "components/PageContainer";
import ClubsList from "components/ClubsList";

const Clubs = () => {
    return (
        <PageContainer title="Clubs" privilege="admin">
            <ClubsList />
        </PageContainer>
    );
};

export default Clubs;
