import styles from "../../styles/Form.module.css";

const categories = [
    "Geeky",
    "Nerdy",
    "Innovative",
    "Subversive",

    "Computers",
    "Robotics",
    "LEGO",
    "Pinky",
    "Gaming",

    "Writing",
    "Art",
    "Music",
    "Design",
    "Improv",
    '"Chemistry"',

    "Explosive",
    "Punny",
];

export function CategoryPage({ value, setValue }) {
    const handleCategoryClick = (e) => {
        const buttonStyle = e.target.closest("button").style;
        // Toggle background color
        // And set color to white
        if (buttonStyle.background === "") {
            buttonStyle.background = "black";
            buttonStyle.color = "white";
        } else {
            buttonStyle.background = "";
            buttonStyle.color = "";
        }

        // Update value
        const category = e.target.textContent;
        if (value.includes(category)) {
            setValue(value.filter((val) => val !== category));
        } else {
            setValue([...value, category]);
        }
    };
    return (
        <div className={styles.categories}>
            {categories.map((category, i) => (
                <button
                    className={styles.pill}
                    onClick={handleCategoryClick}
                    key={i}
                    style={
                        value.includes(category)
                            ? {
                                  background: "black",
                              }
                            : {
                                  background: "transparent",
                                  backdropFilter: "blur(5px)",
                              }
                    }
                >
                    <p
                        style={{
                            fontSize: 36,
                            margin: "7px 40px",
                            color: value.includes(category) ? "white" : "",
                        }}
                    >
                        {category}
                    </p>
                </button>
            ))}
        </div>
    );
}
