import styles from "@/styles/Form.module.css";
import { useEffect } from "react";

export default function CategoryPage({ categories, value, setValue }) {
    const handleCategoryClick = (category) => {
        if (value.includes(category)) {
            setValue(value.filter((val) => val.id != category.id));
        } else {
            setValue([...value, category]);
        }
    };
    return (
        <div className={styles.categories}>
            {categories && categories.length > 0 ? (
                categories.map((category) => (
                    <button
                        className={styles.pill}
                        onClick={() => handleCategoryClick(category)}
                        style={
                            value.includes(category)
                                ? {
                                      background: "black",
                                  }
                                : { background: "white" }
                        }
                        key={category.id}
                    >
                        <p
                            style={{
                                fontSize: 36,
                                margin: "7px 40px",
                                color: value.includes(category)
                                    ? "white"
                                    : "black",
                            }}
                        >
                            {category.name}
                        </p>
                    </button>
                ))
            ) : (
                <p>Error loading categories!</p>
            )}
        </div>
    );
}
