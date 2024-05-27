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
}) {
    const { selectedProject, setSelectedProject } = useSelectedProjectContext();
    const [name, setName] = useState(projectName);
    const router = useRouter();

    useEffect(() => {
        setName(projectName);
    }, [projectName]);

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
                    <input
                        type="text"
                        style={{
                            fontSize: 26,
                            margin: "0.83em",
                            textAlign: "center",
                            background: "none",
                            outline: "none",
                            border: "none",
                            fontWeight: "700",
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InfoIcon scale={33} url={`/project/${databaseId}`} />
                </div>
            ) : (
                <h2
                    style={{ fontSize: 26 }}
                    onClick={() => setSelectedProject(uniqueId)}
                >
                    {name}
                </h2>
            )}
        </>
    );
}
