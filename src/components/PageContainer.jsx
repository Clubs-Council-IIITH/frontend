import React from "react";
import { motion } from "framer-motion";

const pageTransition = {
    in: {
        opacity: 1,
        y: 0,
    },
    out: {
        opacity: 0.8,
        y: "10px",
    },
};

const PageContainer = ({ children }) => {
    return (
        <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
            className="mx-3"
        >
            {children}
        </motion.div>
    );
};

export default PageContainer;
