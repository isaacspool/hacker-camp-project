"use client";

import { createContext, useContext, useState } from "react";

const FormPageContext = createContext({});
export const useFormPageContext = () => useContext(FormPageContext);

export default function FormPageProvider({ children }) {
    const [formPage, setFormPage] = useState(0);
    return (
        <FormPageContext.Provider value={{ formPage, setFormPage }}>
            {children}
        </FormPageContext.Provider>
    );
}
