import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Project, getBackgroundString } from "./Project";
import { Person } from "./Person";
import { Popup } from "./Popup";

const projectDatabase = [
    {
        name: "Project abc",
        types: ["Analytical"],
    },
    {
        name: "Project 123",
        types: ["Analytical", "Creative"],
    },
    {
        name: "Project cool",
        types: ["Analytical", "Engineering"],
    },
    {
        name: "Project wow",
        types: ["Creative", "Engineering"],
    },
    {
        name: "Project super cool",
        types: ["Analytical", "Creative", "Engineering"],
    },
];

export function ScheduleDay({
    day,
    originalProjects,
    satellites,
    rundown,
    language,
}) {
    const [showProjectMenu, setShowProjectMenu] = useState(false);
    const handleFinish = () => {
        setShowProjectMenu(!showProjectMenu);
    };
    const handleProjectSelect = (project) => {
        setShowProjectMenu(false);
        const newProject = {
            staff: ["Kenobi", "The Doctor"],
            types: project.types,
            name: project.name,
            location: "The Void",
        };
        setProjects([...projects, newProject]);
    };

    const [projects, setProjects] = useState(originalProjects);

    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [selectedTypes, setSelectedTypes] = useState([]);

    return (
        <div className={styles.day}>
            <h1 className={styles.dayTitle}>{day}</h1>
            <div className={styles.detailsList}>
                {satellites.map((satellite, i) => (
                    <Person
                        icon="/SatelliteIcon.svg"
                        language={language}
                        key={i}
                    >
                        {satellite}
                    </Person>
                ))}
                {rundown.map((rundownPerson, i) => (
                    <Person
                        icon="/RundownIcon.svg"
                        language={language}
                        key={i + satellites.length}
                    >
                        {rundownPerson}
                    </Person>
                ))}
            </div>
            <div className={[styles.border, styles.projectList].join(" ")}>
                {projects.map((project, i) => (
                    <Project
                        projectName={project.name}
                        location={project.location}
                        staff={project.staff}
                        types={project.types}
                        language={language}
                        key={i}
                    />
                ))}
                <img
                    src="/add_button.svg"
                    width="80"
                    height="80"
                    className={styles.addButton}
                    onClick={handleFinish}
                />
                {showProjectMenu && (
                    <Popup
                        handleSearch={handleSearch}
                        closeEffect={handleFinish}
                        filterChips={[
                            {
                                displayName:
                                    language == "hebrew"
                                        ? "יצירתי"
                                        : "Creative",
                                name: "Creative",
                                color: "rgba(43, 73, 231, 0.25)",
                            },
                            {
                                displayName:
                                    language == "hebrew"
                                        ? "הנדסאי"
                                        : "Engineering",
                                name: "Engineering",
                                color: "rgba(251, 170, 11, 0.25)",
                            },
                            {
                                displayName:
                                    language == "hebrew"
                                        ? "אנליטי"
                                        : "Analytical",
                                name: "Analytical",
                                color: "rgba(220, 63, 63, 0.25)",
                            },
                        ]}
                        filter={selectedTypes}
                        setFilter={setSelectedTypes}
                        language={language}
                    >
                        {[
                            ...projectDatabase,
                            { name: search, types: selectedTypes },
                        ]
                            .filter(
                                (project) =>
                                    ((!search && selectedTypes.length == 0) ||
                                        (project.name
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) &&
                                            (selectedTypes.every((t) =>
                                                project.types.includes(t)
                                            ) ||
                                                selectedTypes.length == 0))) &&
                                    project.name.length > 0
                            )
                            .map((project, i) => (
                                <button
                                    className={[
                                        styles.thinBorder,
                                        styles.staff,
                                    ].join(" ")}
                                    style={{
                                        background: getBackgroundString(
                                            project.types,
                                            "90deg"
                                        ),
                                    }}
                                    onClick={() => handleProjectSelect(project)}
                                    key={i}
                                >
                                    {project.name}
                                </button>
                            ))}
                    </Popup>
                )}
            </div>
        </div>
    );
}
