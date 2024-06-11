"use client";

import { useEffect, useState } from "react";
import { useNotesContext } from "./EditingNotesProvider";
import { useYearContext } from "./YearProvider";

export default function WeekNotes({ week, databaseNote, handleEditNote }) {
    const { editingNotes, _ } = useNotesContext();
    const { year, __ } = useYearContext();
    const [note, setNote] = useState(databaseNote);

    useEffect(() => {
        setNote(databaseNote);
    }, [databaseNote, year]);

    useEffect(() => {
        const submitNote = setTimeout(async () => {
            if (note != databaseNote) {
                await handleEditNote(week, year, note);
            }
        }, 2000);
        return () => clearTimeout(submitNote);
    }, [note]);

    if (editingNotes) {
        return (
            <textarea
                onChange={(e) => setNote(e.target.value)}
                value={note || ""}
                placeholder={`Week ${week} Notes`}
                className="fill small-text rounded margin-1 medium-border padding-3 blur black-scroll"
                id={`textarea_${week}`}
            />
        );
    } else if (note) {
        return note.split("\n").map((line, i) => (
            <p className="fill center-text small-text padding-1 blur" key={i}>
                {line}
            </p>
        ));
    }
}
