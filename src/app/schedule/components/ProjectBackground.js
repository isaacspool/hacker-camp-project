"use client";

import { getBackgroundString } from "@/lib/colors";
import styles from "@/styles/Home.module.css";
import { createContext, useContext, useState } from "react";

const DeletedContext = createContext({});
export const useDeletedContext = () => useContext(DeletedContext);

export default function ProjectBackground({ children, types }) {
    const [isDeleted, setDeleted] = useState(false);
    return (
        <DeletedContext.Provider value={{ isDeleted, setDeleted }}>
            <div
                className={[styles.border, styles.project].join(" ")}
                style={{
                    background: types
                        ? getBackgroundString(types, "180deg")
                        : "inherit",
                    display: isDeleted ? "none" : "flex",
                }}
            >
                {children}
            </div>
        </DeletedContext.Provider>
    );
}
