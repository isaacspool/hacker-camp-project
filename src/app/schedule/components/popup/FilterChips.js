export default function FilterChips({
    filterChipsProvider,
    elementFilter,
    setElementFilter,
    doesMultiSelect,
}) {
    if (!filterChipsProvider) return null;
    const modifyFilter = (name) => {
        return elementFilter.includes(name)
            ? setElementFilter((prev) => prev.filter((f) => f !== name))
            : setElementFilter((prev) => [...prev, name]);
    };
    const clearFilter = () => {
        setElementFilter([]);
    };
    return (
        <div className="flex-evenly fill medium-gap padding-2">
            {filterChipsProvider().map((chip) => (
                <button
                    className="pill small-text medium-border grow padding-3"
                    onClick={() => {
                        if (!doesMultiSelect && elementFilter) {
                            clearFilter();
                        }
                        modifyFilter(chip.name);
                    }}
                    style={{
                        background: chip.color,
                        border: elementFilter.includes(chip.name)
                            ? "2px solid black"
                            : "none",
                        margin: elementFilter.includes(chip.name)
                            ? "-2px 0px"
                            : "2px",
                    }}
                    key={chip.name}
                >
                    {chip.displayName}
                </button>
            ))}
        </div>
    );
}
