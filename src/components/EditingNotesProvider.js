"use client";

import { createContext, useContext, useState } from "react";

const EditingNotesContext = createContext(false);
export const useNotesContext = () => useContext(EditingNotesContext);

export default function EditingNotesProvider({ children }) {
    const [editingNotes, setEditingNotes] = useState(false);
    return (
        <EditingNotesContext.Provider value={{ editingNotes, setEditingNotes }}>
            {children}
        </EditingNotesContext.Provider>
    );
}
