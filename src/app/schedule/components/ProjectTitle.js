"use client";

import { useSelectedProjectContext } from "./SelectedProjectProvider";
import styles from "@/styles/Home.module.css";
import InfoIcon from "./InfoIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectTitle({
    uniqueId,
    databaseId,
    projectName,
    handleDeletion,
    setProjectName,
    presentationMode,
}) {
    const { selectedProject, setSelectedProject } = useSelectedProjectContext();
    const [name, setName] = useState(projectName);
    const [lastClickedIndex, setLastClickedIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setName(projectName);
    }, [projectName]);

    useEffect(() => {
        if (selectedProject == uniqueId) {
            const nameInput = document.getElementById(`textarea_${uniqueId}`);
            if (nameInput) nameInput.focus();
            nameInput.selectionStart = lastClickedIndex;
        }
    }, [selectedProject]);

    useEffect(() => {
        const submitNewName = setTimeout(async () => {
            if (name != projectName) {
                await setProjectName(name);
            }
        }, 2000);
        return () => clearTimeout(submitNewName);
    }, [name]);
    return (
        <>
            {selectedProject == uniqueId ? (
                <div
                    style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 0.83em",
                    }}
                >
                    <img
                        src="/icons/trash.svg"
                        width="31"
                        height="34.44"
                        className={styles.trashButton}
                        onClick={async () => {
                            await handleDeletion(uniqueId).then((_) =>
                                router.refresh()
                            );
                        }}
                    />
                    <textarea
                        style={{
                            fontSize: 26,
                            margin: "0.83em",
                            textAlign: "center",
                            background: "none",
                            outline: "none",
                            border: "none",
                            fontWeight: "700",
                            fontFamily: '"Lato", sans-serif',
                        }}
                        rows={
                            name.split("").filter((char) => char == "\n")
                                .length + 1
                        }
                        className={styles.blackScroll}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id={`textarea_${uniqueId}`}
                    />
                    <InfoIcon scale={33} url={`/project/${databaseId}`} />
                </div>
            ) : (
                <div
                    style={{
                        marginBlockStart: 26 * 0.83,
                        marginBlockEnd: 26 * 0.83,
                    }}
                >
                    {name.split("\n").map((line, i) => (
                        <h2
                            style={{ fontSize: 26, margin: 0 }}
                            onClick={() => {
                                if (!presentationMode)
                                    setSelectedProject(uniqueId);

                                const selection = getSelection();
                                setLastClickedIndex(
                                    selection.focusOffset +
                                        name
                                            .split("\n")
                                            .filter((_, j) => j < i)
                                            .join("\n").length
                                );
                            }}
                            key={i}
                        >
                            {line}
                        </h2>
                    ))}
                </div>
            )}
        </>
    );
}
