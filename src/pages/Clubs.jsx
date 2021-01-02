import PageContainer from "components/PageContainer";
import ClubsList from "components/ClubsList";

const Clubs = () => {
    return (
        <PageContainer title="Clubs" searchAttr={(o) => o.name}>
            <ClubsList />
        </PageContainer>
    );
};

export default Clubs;
