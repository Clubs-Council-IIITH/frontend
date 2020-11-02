import React from "react";
import { Input } from "reactstrap";

const Searchbar = ({ dataList, searchAttr, setFilteredList, className }) => {
    const updateSearch = (e) => {
        if (!dataList) return null;
        setFilteredList(
            dataList.filter((obj) =>
                searchAttr(obj).toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <Input
            onChange={updateSearch}
            className={"searchbar shadow-sm " + className}
            type="text"
            bsSize="lg"
            placeholder="Search..."
            autoFocus
        />
    );
};

export default Searchbar;
