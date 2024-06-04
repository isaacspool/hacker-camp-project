"use client";

import { createContext, useContext, useState } from "react";
import PersonButton from "./PersonButton";

const TempStaffContext = createContext({});
export const useTempStaffContext = () => useContext(TempStaffContext);

export default function TempStaffProvider({ children }) {
    const [tempStaff, setTempStaff] = useState([]);
    return (
        <TempStaffContext.Provider value={{ tempStaff, setTempStaff }}>
            {tempStaff.map((staff, i) => (
                <PersonButton icon="/icons/person.svg" key={i}>
                    {staff}
                </PersonButton>
            ))}
            {children}
        </TempStaffContext.Provider>
    );
}
