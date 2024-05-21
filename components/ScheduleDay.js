import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Project, getBackgroundString, getColorFromType } from "./Project";
import { Person } from "./Person";
import { Popup } from "./Popup";
import { translate } from "../pages/index.js";
import { InfoIcon } from "./InfoIcon.js";

let projectDatabase = [
    {
        name: "Project abc",
        types: ["Analytical"],
        id: 0,
    },
    {
        name: "Project 123",
        types: ["Analytical", "Creative"],
        id: 1,
    },
    {
        name: "Project cool",
        types: ["Analytical", "Engineering"],
        id: 2,
    },
    {
        name: "Project wow",
        types: ["Creative", "Engineering"],
        id: 3,
    },
    {
        name: "Project super cool",
        types: ["Analytical", "Creative", "Engineering"],
        id: 4,
    },
    {
        name: "Catan גדול",
        types: ["Analytical", "Creative", "Engineering"],
        description: `(Shaiel and Yehoshua made this together)
        Create a Catan gameset in the Pink Room, paint it, et cetera. . . 
        
        This will be used to teach strategies on how to dominate in Catan`,
        goals: `Kids will learn how to cut hexagons on a tablesaw
        Kids will have a working version of Catan
        Kids will make minor design adaptations together
        Kids will learn how the game itself is used, so they can make the above decisions
        and also. .  . so we can create our own הרכבה(expantion) (with . . . dragons?  tanks? Daleks? ships? TUNNELS?  Goblins?  etc.)`,
        categories: [
            "Geeky",
            "Innovative",
            "Subversive",
            "Gaming",
            "Art",
            "Advanced",
        ],
        materials:
            "Pink room and wood supplies required for building large model of the game",
        min_participants: 8,
        max_participants: 12,
        duration: 0.5,
        id: 5,
    },
    {
        name: "Project 2",
        types: ["Analytical", "Creative"],
        id: 6,
    },
    {
        name: "Project 3",
        types: ["Analytical", "Engineering"],
        id: 7,
    },
    {
        name: "Project 4",
        types: ["Creative", "Engineering"],
        id: 8,
    },
    {
        name: "Project 5",
        types: ["Analytical", "Creative", "Engineering"],
        id: 9,
    },
];

export function getProjectById(id) {
    return projectDatabase.find((project) => project.id == id);
}

export function ScheduleDay({
    day,
    index,
    originalProjects,
    satellites,
    rundown,
    language,
    editingProject,
    setEditingProject,
}) {
    const [showProjectMenu, setShowProjectMenu] = useState(false);
    const handleFinish = () => {
        setShowProjectMenu(!showProjectMenu);
    };

    const [projects, setProjects] = useState([...originalProjects]);
    const handleProjectSelect = (project) => {
        setShowProjectMenu(false);
        let id = project.id ? project.id : projectDatabase.length;
        const newProject = {
            staff: ["General Kenobi", "The Doctor"],
            location: "The Void",
            name: project.name,
            types: project.types,
            id: id,
        };
        if (!project.id) {
            const newDatabaseProject = {
                id: id,
                name: project.name,
                types: project.types,
            };
            projectDatabase = [...projectDatabase, newDatabaseProject];
        }
        setProjects([...projects, newProject]);
    };

    const handleDeletion = (projectIndex) => {
        setProjects(projects.filter((_, j) => j != projectIndex));
        setEditingProject(null);
    };

    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [staff, setStaff] = useState(satellites.concat(rundown));

    const [selectedTypes, setSelectedTypes] = useState([]);

    useEffect(() => {
        setProjects(
            projects.map((project) => {
                const projectInDatabase = getProjectById(project.id);
                return {
                    location: project.location,
                    staff: project.staff,
                    name: projectInDatabase.name,
                    types: projectInDatabase.types,
                    id: project.id,
                };
            })
        );
    }, []);

    return (
        <div className={styles.day} id={"day_" + index}>
            <h1 className={styles.dayTitle}>{day}</h1>
            <div className={styles.detailsList}>
                {satellites.map((satellite, i) => (
                    <Person
                        icon="/icons/satellite.svg"
                        index={i}
                        language={language}
                        staff={staff}
                        setStaff={setStaff}
                        setEditingProject={setEditingProject}
                        key={i}
                    />
                ))}
                {rundown.map((rundownPerson, i) => (
                    <Person
                        icon="/icons/rundown.svg"
                        index={i + satellites.length}
                        language={language}
                        staff={staff}
                        setStaff={setStaff}
                        setEditingProject={setEditingProject}
                        key={i + satellites.length}
                    />
                ))}
            </div>
            <div className={[styles.border, styles.projectList].join(" ")}>
                {projects.map((project, i) => {
                    return (
                        <Project
                            projectName={project.name}
                            setProjectName={(name) => {
                                const newProjects = [...projects];
                                newProjects[i].name = name;
                                setProjects(newProjects);
                            }}
                            location={project.location}
                            setLocation={(location) => {
                                const newProjects = [...projects];
                                newProjects[i].location = location;
                                setProjects(newProjects);
                            }}
                            staff={project.staff}
                            setStaff={(newStaff) => {
                                const newProjects = [...projects];
                                newProjects[i].staff = newStaff;
                                setProjects(newProjects);
                            }}
                            types={project.types}
                            language={language}
                            editingProject={editingProject}
                            setEditingProject={setEditingProject}
                            index={i}
                            handleDeletion={handleDeletion}
                            databaseId={project.id}
                            uniqueId={`${i}_${index}`}
                            key={i}
                        />
                    );
                })}
                <div className={styles.addButtonContainer}>
                    <img
                        src="/icons/add.svg"
                        width="80"
                        height="80"
                        className={styles.addButton}
                        onClick={handleFinish}
                    />
                </div>
                {showProjectMenu && (
                    <Popup
                        handleSearch={handleSearch}
                        closeEffect={handleFinish}
                        setEditingProject={setEditingProject}
                        filterChips={[
                            "Creative",
                            "Engineering",
                            "Analytical",
                        ].map((type) => ({
                            displayName: translate(
                                `type.${type.toLowerCase()}`,
                                language
                            ),
                            name: type,
                            color: getColorFromType(type),
                        }))}
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
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "3%",
                                    }}
                                    key={i}
                                >
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
                                        onClick={() =>
                                            handleProjectSelect(project)
                                        }
                                    >
                                        {project.name}
                                    </button>
                                    <InfoIcon
                                        scale={45}
                                        url={`/project/${project.id}`}
                                    />
                                </div>
                            ))}
                    </Popup>
                )}
            </div>
        </div>
    );
}
