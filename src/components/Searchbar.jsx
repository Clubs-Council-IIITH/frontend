import React, { useState } from "react";
import { Input } from "reactstrap";

const Searchbar = (props) => {
    const updateSearch = (e) => {
        props.setSearchTerm(e.target.value);
    };

    return (
        <Input
            onChange={updateSearch}
            className="shadow-sm"
            type="text"
            bsSize="lg"
            placeholder="Search..."
        />
    );
};

export default Searchbar;
