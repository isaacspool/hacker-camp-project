"use client";

import { createContext, useContext, useState } from "react";
import PersonButton from "./PersonButton";
import PersonIcon from "./project/PersonIcon";

const TempStaffContext = createContext({});
export const useTempStaffContext = () => useContext(TempStaffContext);

export default function TempStaffProvider({ children, staffInProject }) {
    const [tempStaff, setTempStaff] = useState([]);
    return (
        <TempStaffContext.Provider value={{ tempStaff, setTempStaff }}>
            <PersonIcon staff={staffInProject} tempStaff={tempStaff} />
            {tempStaff.map((staff, i) => (
                <PersonButton icon="/icons/person.svg" key={i} canDelete>
                    {staff}
                </PersonButton>
            ))}
            {children}
        </TempStaffContext.Provider>
    );
}
