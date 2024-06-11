"use client";

import { useSelectedProjectContext } from "../SelectedProjectProvider";
import InfoIcon from "../InfoIcon";
import { useEffect, useState } from "react";
import { useDeletedContext } from "./ProjectBackground";
import Image from "next/image";
import { useRouterRefresh } from "@/lib/hooks";

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
    const refresh = useRouterRefresh();
    const { _, setDeleted } = useDeletedContext();

    const handleDeleteProject = async () => {
        setDeleted(true);
        await handleDeletion(uniqueId).then(() =>
            refresh().then(() => setDeleted(false))
        );
    };

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
                <div className="flex-space center fill title-padding-px">
                    <Image
                        src="/icons/trash.svg"
                        width="31"
                        height="34"
                        alt="trash button"
                        className="hover-scale"
                        onClick={handleDeleteProject}
                    />
                    <textarea
                        className="black-scroll center-text bold lato large-text"
                        rows={
                            name.split("").filter((char) => char == "\n")
                                .length + 1
                        }
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id={`textarea_${uniqueId}`}
                    />
                    <InfoIcon scale={33} url={`/project/${databaseId}`} />
                </div>
            ) : (
                <div className="title-padding-px">
                    {name.split("\n").map((line, i) => (
                        <h2
                            className="large-text"
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
