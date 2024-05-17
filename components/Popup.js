import React, { useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

export function Popup({
    children,
    handleSearch,
    closeEffect,
    filterChips,
    filter,
    setFilter,
    language,
}) {
    function handleClosePopup() {
        const popups = document.querySelectorAll("#popup");
        popups.forEach((popup) => (popup.style.display = "none"));
        closeEffect();
    }
    const handlePressExitKey = (e) => {
        if (e.key === "Escape") {
            handleClosePopup();
        }
        if (e.key == "Enter") {
            const selectionMenu = document.getElementById("selection_menu");
            if (selectionMenu && selectionMenu.children.length == 1) {
                selectionMenu.children[0].click();
            }
        }
    };
    // add event listener to close popup on escape key press
    useEffect(() => {
        document.addEventListener("keydown", handlePressExitKey);
        // focus on search input
        document.getElementById("search").focus();
        return () => {
            document.removeEventListener("keydown", handlePressExitKey);
        };
    }, []);
    const myRef = useRef();

    const modifyFilter = (name) => {
        console.log(name);
        console.log(filter);
        return filter.includes(name)
            ? setFilter(filter.filter((f) => f !== name))
            : setFilter([...filter, name]);
    };

    return (
        <div id="popup">
            <button
                className={styles.blurBackground}
                onClick={handleClosePopup}
                ref={myRef}
            />
            <div className={styles.popup}>
                <div className={styles.popupNav}>
                    <img
                        style={{ opacity: 0 }}
                        src="/close_button.svg"
                        width="30"
                        height="30"
                    />
                    <div className={styles.search}>
                        <img src="/search.svg" width="30" height="30" />
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder={
                                language == "hebrew" ? "חיפוש" : "Search"
                            }
                            onChange={handleSearch}
                            id="search"
                        />
                    </div>
                    <button
                        style={{
                            outline: "none",
                            background: "none",
                            border: "none",
                        }}
                    >
                        <img
                            src="/close_button.svg"
                            width="30"
                            height="30"
                            onClick={handleClosePopup}
                            style={{ cursor: "pointer" }}
                        />
                    </button>
                </div>
                {filterChips && (
                    <div className={styles.filterChips}>
                        {filterChips.map((chip, i) => (
                            <button
                                className={styles.filterChip}
                                onClick={() => modifyFilter(chip.name)}
                                style={{
                                    background: chip.color,
                                    border: filter.includes(chip.name)
                                        ? "2px solid black"
                                        : "none",
                                }}
                                key={i}
                            >
                                {chip.displayName}
                            </button>
                        ))}
                    </div>
                )}

                <div className={styles.selectionMenu} id="selection_menu">
                    {children}
                </div>
            </div>
        </div>
    );
}
