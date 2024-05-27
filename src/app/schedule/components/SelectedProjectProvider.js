"use client";

import { createContext, useContext, useState } from "react";

const SelectedProjectContext = createContext({});
export const useSelectedProjectContext = () =>
    useContext(SelectedProjectContext);

export default function SelectedProjectProvider({ children }) {
    const [selectedProject, setSelectedProject] = useState(null);
    return (
        <SelectedProjectContext.Provider
            value={{ selectedProject, setSelectedProject }}
        >
            {children}
        </SelectedProjectContext.Provider>
    );
}
