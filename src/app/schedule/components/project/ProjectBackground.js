"use client";

import { getBackgroundString } from "@/lib/colors";
import { createContext, useContext, useState } from "react";

const DeletedContext = createContext({});
export const useDeletedContext = () => useContext(DeletedContext);

export default function ProjectBackground({ children, types }) {
    const [isDeleted, setDeleted] = useState(false);
    return (
        <DeletedContext.Provider value={{ isDeleted, setDeleted }}>
            <div
                className="thick-border rounded-30 flex-cols center-all margin-1 width-500"
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
