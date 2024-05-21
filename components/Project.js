import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Person } from "./Person";
import { Popup } from "./Popup";
import { InfoIcon } from "./InfoIcon";

const rooms = [
    "Bifrost",
    "Doofenshmirtz Evil Incorperated",
    "Hyrule",
    "Jedi Temple",
    "Nautilus",
    "Nether",
    "Pandora's Box",
    "Pink Room",
    "Shire",
    "The Bridge",
    "The Cliffs of Insanity",
    "The Forbidden Forest",
    "Workshop",
];

export const getColorFromType = (type) => {
    switch (type) {
        case "Analytical":
            return "rgba(220, 63, 63, 0.25)";
        case "Creative":
            return "rgba(43, 73, 231, 0.25)";
        case "Engineering":
            return "rgba(251, 170, 11, 0.25)";
    }
};

export const getBackgroundString = (types, degrees) => {
    let colors = types.map(getColorFromType);
    let background = `linear-gradient(${degrees}, `;
    switch (colors.length) {
        case 0:
            background = "white";
            break;
        case 1:
            background += colors[0] + " 0%, " + colors[0] + " 100%)";
            break;
        case 2:
            background += colors[0] + " 0%, " + colors[1] + " 100%)";
            break;
        case 3:
            background +=
                colors[0] +
                " 0%, " +
                colors[1] +
                " 50%, " +
                colors[2] +
                " 100%)";
            break;
    }
    return background;
};

export function Project({
    staff,
    location,
    setStaff,
    setLocation,
    databaseId,
    uniqueId,
    index,
    language,
    setEditingProject,
    editingProject,
    projectName,
    setProjectName,
    handleDeletion,
    types,
}) {
    const [showSelectionMenu, setShowSelectionMenu] = useState(false);
    const [search, setSearch] = useState("");

    const handleFinish = () => {
        setShowSelectionMenu(!showSelectionMenu);
    };
    const handleRoomSelect = (room) => {
        setShowSelectionMenu(false);
        setLocation(room, index);
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const handleBeginEditing = () => {
        setEditingProject(uniqueId);
    };
    const handleAddStaff = () => {
        setStaff([...staff, "Staff"]);
        setEditingProject(null);
    };

    return (
        <div
            className={[styles.border, styles.project].join(" ")}
            style={
                types && {
                    background: getBackgroundString(types, "180deg"),
                }
            }
            id={"project_" + uniqueId}
        >
            {editingProject == uniqueId ? (
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
                        onClick={() => {
                            handleDeletion(index);
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
                            fontWeight: "bold",
                        }}
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <InfoIcon scale={33} url={`/project/${databaseId}`} />
                </div>
            ) : (
                <h2 style={{ fontSize: 26 }} onClick={handleBeginEditing}>
                    {projectName}
                </h2>
            )}
            <div className={styles.projectBody}>
                <div className={styles.location} onClick={handleFinish}>
                    <img
                        src="/icons/location.svg"
                        alt="location"
                        width={30}
                        height={30}
                        className={styles.locationButton}
                    />
                    <p style={{ fontSize: 24, margin: "1%" }}>{location}</p>
                </div>
                <ul className={styles.staffList}>
                    {staff.map((person, i) => (
                        <Person
                            icon="/icons/person.svg"
                            index={i}
                            language={language}
                            handleDeletion={(index) => {
                                setStaff(staff.filter((_, j) => j != index));
                            }}
                            staff={staff}
                            setStaff={setStaff}
                            setEditingProject={setEditingProject}
                            key={i}
                        />
                    ))}

                    <img
                        src="/icons/add.svg"
                        width="50"
                        height="50"
                        className={styles.addButton}
                        onClick={handleAddStaff}
                    />
                </ul>
            </div>
            {showSelectionMenu && (
                <Popup
                    handleSearch={handleSearch}
                    closeEffect={handleFinish}
                    language={language}
                    setEditingProject={setEditingProject}
                >
                    {rooms
                        .filter(
                            (room) =>
                                !search ||
                                room
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                room == "Option 42"
                        )
                        .map((room, i) => (
                            <button
                                className={[
                                    styles.thinBorder,
                                    styles.staff,
                                ].join(" ")}
                                onClick={() => handleRoomSelect(room)}
                                key={i}
                            >
                                {room}
                            </button>
                        ))}
                </Popup>
            )}
        </div>
    );
}
