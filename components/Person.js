import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Popup } from "../components/Popup";

const staff = [
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

export function Person({ children, icon, language }) {
    // Usage: <Person>text here</Person>
    // children is used because the text is passed as a child of the component
    const [showSelectionMenu, setShowSelectionMenu] = useState(false);
    const handleFinish = () => {
        setShowSelectionMenu(!showSelectionMenu);
    };
    const handlePersonSelect = (person) => {
        setShowSelectionMenu(false);
        setSelectedPerson(person);
        // move person to second to last position in array
        const index = staff.indexOf(person);
        staff.splice(index, 1);
        staff.splice(staff.length - 1, 0, person);
    };

    const [selectedPerson, setSelectedPerson] = useState(children);

    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <button
                className={[styles.thinBorder, styles.pill, styles.person].join(
                    " "
                )}
                onClick={handleFinish}
            >
                <img src={icon} width={21} height={21} />
                <p style={{ margin: 0 }}>{selectedPerson}</p>
            </button>
            {showSelectionMenu && (
                <Popup
                    handleSearch={handleSearch}
                    closeEffect={handleFinish}
                    language={language}
                >
                    {staff
                        .filter(
                            (person) =>
                                !search ||
                                person
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                        )
                        .map((person) => (
                            <button
                                className={[
                                    styles.thinBorder,
                                    styles.staff,
                                ].join(" ")}
                                onClick={() => handlePersonSelect(person)}
                                key={person}
                            >
                                {person}
                            </button>
                        ))}
                </Popup>
            )}
        </div>
    );
}
