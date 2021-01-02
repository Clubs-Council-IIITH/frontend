import "./styles.scss";
import { useContext } from "react";
import { Input } from "reactstrap";

import { PageContext } from "components/PageContainer";

const Searchbar = () => {
    const { content, searchAttr, setSearchContent } = useContext(PageContext);

    const updateSearch = (e) => {
        if (!content) return null;
        setSearchContent(
            content.filter((obj) =>
                searchAttr(obj).toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <Input onChange={updateSearch} type="text" className="searchbar" placeholder="Search..." />
    );
};

export default Searchbar;
