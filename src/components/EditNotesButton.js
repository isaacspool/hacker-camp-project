"use client";

import { useNotesContext } from "./EditingNotesProvider";
import Image from "next/image";

export default function EditNotesButton({ week }) {
    const { editingNotes, setEditingNotes } = useNotesContext();
    return (
        <Image
            src="/icons/open_form_pencil.svg"
            className="hover-scale"
            onClick={() => {
                setEditingNotes(!editingNotes);
                if (!editingNotes) {
                    setTimeout(() => {
                        document.getElementById(`textarea_${week}`)?.focus();
                    }, 1);
                }
            }}
            width="45"
            height="45"
            alt="notes"
        />
    );
}
