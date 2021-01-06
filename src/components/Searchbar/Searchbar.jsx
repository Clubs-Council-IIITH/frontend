/**
 * Searchbar Component to filter rendered content on input.
 *
 * props:
 *  - searchAttr (`function`): Function that extracts search attribute
 *                             when given an object.
 * context:
 *  - content (`list`): Complete list of objects to be rendered.
 *  - setSearchContent (`hook`): To update the rendered content list.
 */

import "./styles.scss";
import { useContext } from "react";
import { Input } from "reactstrap";

import { PageContext } from "components/PageContainer";

const Searchbar = ({ searchAttr }) => {
    const { content, setSearchContent } = useContext(PageContext);

    const updateSearch = (e) => {
        if (!content) return null;
        setSearchContent(
            content.filter((obj) =>
                searchAttr(obj).toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    if (!searchAttr) return null;
    return (
        <Input onChange={updateSearch} type="text" className="searchbar" placeholder="Search..." />
    );
};

export default Searchbar;
