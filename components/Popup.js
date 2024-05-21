import React, { useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { translate } from "../pages/index.js";

export function Popup({
    children,
    handleSearch,
    closeEffect,
    filterChips,
    filter,
    setFilter,
    useTrashButton,
    handleTrashButton,
    language,
    setEditingProject,
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
        if (
            e.key == "Delete" ||
            (e.key == "Backspace" &&
                !document.getElementById("search").matches(":focus"))
        ) {
            const trashButton = document.getElementById("trash_button");
            if (trashButton) {
                trashButton.click();
            }
        }
    };
    // add event listener to close popup on escape key press
    useEffect(() => {
        setEditingProject(null);
        document.addEventListener("keydown", handlePressExitKey);
        // focus on search input
        document.getElementById("search").focus();
        return () => {
            document.removeEventListener("keydown", handlePressExitKey);
        };
    }, []);
    const myRef = useRef();

    const modifyFilter = (name) => {
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
                        src="/icons/trash.svg"
                        width="30"
                        height="33.33"
                        style={{ opacity: useTrashButton ? 1 : 0 }}
                        className={styles.trashButton}
                        onClick={useTrashButton ? handleTrashButton : () => {}}
                        id="trash_button"
                    />
                    <div className={styles.search}>
                        <img src="/icons/search.svg" width="30" height="30" />
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder={translate("form.search", language)}
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
                            src="/icons/close.svg"
                            width="30"
                            height="30"
                            onClick={handleClosePopup}
                            className={styles.closeButton}
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

                <div
                    className={[styles.selectionMenu, styles.blackScroll].join(
                        " "
                    )}
                    id="selection_menu"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
