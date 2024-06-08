export default function CategoryPage({ categories, value, setValue }) {
    const handleCategoryClick = (category) => {
        if (value.includes(category)) {
            setValue(value.filter((val) => val.id != category.id));
        } else {
            setValue([...value, category]);
        }
    };
    return (
        <div className="flex-wrap big-gap-px padding-3">
            {categories && categories.length > 0 ? (
                categories.map((category) => (
                    <button
                        className="pill grow thick-border hover-darken"
                        onClick={() => handleCategoryClick(category)}
                        style={
                            value.includes(category)
                                ? {
                                      backgroundColor: "black",
                                  }
                                : { backgroundColor: "white" }
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
