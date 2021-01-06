import PageContainer from "components/PageContainer";
import ClubsList from "components/ClubsList";
import Searchbar from "components/Searchbar";

const Clubs = () => {
    return (
        <PageContainer title="Clubs" component={<Searchbar searchAttr={(o) => o.name} />}>
            <ClubsList />
        </PageContainer>
    );
};

export default Clubs;
