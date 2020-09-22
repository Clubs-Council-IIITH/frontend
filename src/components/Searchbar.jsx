import React from "react";
import { Input } from "reactstrap";

const Searchbar = (props) => {
    const updateSearch = (e) => {
        if (!props.dataList) return null;
        props.setFilteredList(
            props.dataList.filter((obj) =>
                obj.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <Input
            onChange={updateSearch}
            className={"searchbar shadow-sm " + props.className}
            type="text"
            bsSize="lg"
            placeholder="Search..."
            autoFocus
        />
    );
};

export default Searchbar;
