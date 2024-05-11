import styles from "../styles/Home.module.css";
import { useState } from "react";

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

export function Person({ children, icon }) {
    // Usage: <Person>text here</Person>
    // children is used because the text is passed as a child of the component
    const [showSelectionMenu, setShowSelectionMenu] = useState(false);
    const handlePersonSelect = () => {
        // setShowSelectionMenu(!showSelectionMenu);

        const popup = document.querySelector("#popup");
        popup.style.display = "block";
    };
    const [selectedPerson, setSelectedPerson] = useState(children);

    return (
        <div style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <button
                className={[styles.thinBorder, styles.pill, styles.person].join(
                    " "
                )}
                onClick={handlePersonSelect}
            >
                <img src={icon} width={23} height={23} />
                <p style={{ margin: 0 }}>{selectedPerson}</p>
            </button>
            <div
                className={styles.selectionMenu}
                style={{ display: showSelectionMenu ? "flex" : "none" }}
            >
                {staff.map((person) => (
                    <button
                        className={styles.thinBorder}
                        style={{ padding: "0.5em 1em", fontSize: "1em" }}
                        onClick={() => {
                            setShowSelectionMenu(false);
                            setSelectedPerson(person);
                        }}
                    >
                        {person}
                    </button>
                ))}
            </div>
        </div>
    );
}
