import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Person } from "./Person";
import { Popup } from "./Popup";

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

export const getBackgroundString = (types, degrees) => {
    let colors = types.map((type) => {
        switch (type) {
            case "Analytical":
                return "rgba(220, 63, 63, 0.25)";
            case "Creative":
                return "rgba(43, 73, 231, 0.25)";
            case "Engineering":
                return "rgba(251, 170, 11, 0.25)";
        }
    });
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

export function Project(props) {
    const [staff, setStaff] = useState(props.staff);
    const [showSelectionMenu, setShowSelectionMenu] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(props.location);
    const [search, setSearch] = useState("");

    const handleFinish = () => {
        setShowSelectionMenu(!showSelectionMenu);
    };
    const handleRoomSelect = (room) => {
        setShowSelectionMenu(false);
        setSelectedLocation(room);
        // move room to second to last position in array
        const index = rooms.indexOf(room);
        rooms.splice(index, 1);
        rooms.splice(rooms.length - 1, 0, room);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [editingName, setEditingName] = useState(false);
    const [projectName, setProjectName] = useState(props.projectName);

    const handleFocus = (e) => {
        console.log("hello");
        if (e.target.id != props.projectName) {
            setEditingName(false);
        }
    };

    useEffect(() => {
        if (document.activeElement.id != props.projectName) {
            console.log(document.activeElement.id);
            setEditingName(false);
        }
    }, []);

    return (
        <div
            className={[styles.border, styles.project].join(" ")}
            style={{
                background: getBackgroundString(props.types, "180deg"),
            }}
            id={props.projectName}
        >
            {editingName ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="/trash_button.svg"
                        width="35"
                        height="38.89"
                        style={{ opacity: 0 }}
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
                        id={props.projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    ></input>
                    <img src="/trash_button.svg" width="35" height="35" />
                </div>
            ) : (
                <h2
                    style={{ fontSize: 26 }}
                    onClick={() => setEditingName(true)}
                >
                    {props.projectName}
                </h2>
            )}
            <div className={styles.projectBody}>
                <div className={styles.location} onClick={handleFinish}>
                    <img
                        src="/location_pin.svg"
                        alt="location"
                        width={30}
                        height={30}
                        className={styles.locationButton}
                    />
                    <p style={{ fontSize: 24, margin: "1%" }}>
                        {selectedLocation}
                    </p>
                </div>
                <ul className={styles.staffList}>
                    {staff.map((person, i) => (
                        <Person
                            icon="/PersonIcon.svg"
                            index={i}
                            language={props.language}
                            handleDeletion={(index) => {
                                setStaff(staff.filter((_, j) => j != index));
                            }}
                            staff={staff}
                            setStaff={setStaff}
                            key={i}
                        />
                    ))}

                    <img
                        src="/add_button.svg"
                        width="50"
                        height="50"
                        className={styles.addButton}
                        onClick={() => setStaff([...staff, "Staff"])}
                    />
                </ul>
            </div>
            {showSelectionMenu && (
                <Popup
                    handleSearch={handleSearch}
                    closeEffect={handleFinish}
                    language={props.language}
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
