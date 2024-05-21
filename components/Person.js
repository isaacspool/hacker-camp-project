import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Popup } from "../components/Popup";

const staffList = [
    "Alex",
    "AmTal",
    "Ariel",
    "Hadaria",
    "Isaac",
    "Matan",
    "Maya",
    "Daniel",
    "Rafi",
    "Ranon",
    "Sapir",
    "Shai",
    "Shaiel",
    "Shayna",
    "Yehoshua",
    "Zev",
    "Option 42",
];

export function Person({
    index,
    icon,
    language,
    handleDeletion,
    staff,
    setStaff,
    setEditingProject,
}) {
    // Usage: <Person>text here</Person>
    // children is used because the text is passed as a child of the component
    const [showSelectionMenu, setShowSelectionMenu] = useState(false);
    const handleFinish = () => {
        setShowSelectionMenu(!showSelectionMenu);
    };
    const handlePersonSelect = (person) => {
        setShowSelectionMenu(false);
        const editedStaff = [...staff];
        editedStaff[index] = person;
        setStaff(editedStaff);
    };

    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleTrashButton = () => {
        setShowSelectionMenu(false);
        handleDeletion(index);
    };

    return (
        <div
            id="person"
            style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
        >
            <button
                className={[styles.thinBorder, styles.pill, styles.person].join(
                    " "
                )}
                onClick={handleFinish}
            >
                <img src={icon} width={21} height={21} />
                <p style={{ margin: 0, color: "black" }}>{staff[index]}</p>
            </button>
            {showSelectionMenu && (
                <Popup
                    handleSearch={handleSearch}
                    closeEffect={handleFinish}
                    useTrashButton={handleDeletion !== undefined}
                    handleTrashButton={handleTrashButton}
                    language={language}
                    setEditingProject={setEditingProject}
                >
                    {staffList
                        .filter(
                            (person) =>
                                !search ||
                                person
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                        )
                        .map((person, i) => (
                            <button
                                className={[
                                    styles.thinBorder,
                                    styles.staff,
                                ].join(" ")}
                                onClick={() => handlePersonSelect(person)}
                                key={i}
                            >
                                {person}
                            </button>
                        ))}
                </Popup>
            )}
        </div>
    );
}