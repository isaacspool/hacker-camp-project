"use server";

import styles from "@/styles/Home.module.css";
import { getBackgroundString, getColorFromType } from "@/lib/colors";
import { translate } from "@/lib/translation";
import InfoIcon from "../components/InfoIcon";
import prisma from "@/lib/prisma";
import { mockDatabase } from "@/lib/mockData";

export const projectListDataFilter = async (project, search, selectedTypes) => {
    return (
        ((!search && selectedTypes.length == 0) || // There is no seach or...
            (project.name.toLowerCase().includes(search.toLowerCase()) && // The project has the search term
                (selectedTypes.every((t) => project.types.includes(t)) || // and the project's types are what was selected
                    selectedTypes.length == 0))) &&
        project.name.length > 0 // Removes new project if search is empty
    );
};

export const projectDataProvider = async (search, selectedTypes) => {
    return [...mockDatabase, { name: search, types: selectedTypes }];
};

export const projectListItemProvider = async (project, data) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "3%",
            }}
        >
            <button
                className={[styles.thinBorder, styles.staff].join(" ")}
                style={{
                    background: getBackgroundString(project.types, "90deg"),
                }}
                //handleSelectProject(project, data)}
            >
                {project.name}
            </button>
            <InfoIcon scale={45} url={`/project/${project.id}`} />
        </div>
    );
};
