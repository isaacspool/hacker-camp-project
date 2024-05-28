"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { translate } from "@/lib/translation";
import { useSelectedProjectContext } from "./SelectedProjectProvider";
import { useLanguageContext } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
import { getBackgroundString, getColorFromType } from "@/lib/colors";
import InfoIcon from "./InfoIcon";

function useFilter() {
    const [elementFilter, setElementFilter] = useState([]);
    const modifyFilter = (name) => {
        return elementFilter.includes(name)
            ? setElementFilter(elementFilter.filter((f) => f !== name))
            : setElementFilter([...elementFilter, name]);
    };
    const clearFilter = () => {
        setElementFilter([]);
    };
    return [elementFilter, modifyFilter, clearFilter];
}

const filterChipsProvider = (language) => {
    return ["Creative", "Engineering", "Analytical"].map((type) => ({
        displayName: translate(`type.${type.toLowerCase()}`, language),
        name: type,
        color: getColorFromType(type),
    }));
};

export default function Popup({
    children,
    data,
    clickHandler,
    useFilterChips,
    doFlexGrow,
    handleTrashButton,
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [search, setSearch] = useState("");
    const [elementFilter, modifyFilter, clearFilter] = useFilter();

    const { _, setSelectedProject } = useSelectedProjectContext();
    const language = useLanguageContext();

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
        setSearch("");
        setSelectedProject(null);
        clearFilter();
    };

    const handlePressKey = (e) => {
        if (!showPopup) return;
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
            handleTrashButton &&
            (e.key == "Delete" ||
                (e.key == "Backspace" &&
                    !document.getElementById("search").matches(":focus")))
        ) {
            const deleteStaff = async () => {
                await handleTrashButton();
            };
            deleteStaff();
        }
    };

    const [filterChips, setFilterChips] = useState(null);

    useEffect(() => {
        document.addEventListener("keydown", handlePressKey);
        const searchInput = document.getElementById("search");
        if (searchInput) searchInput.focus();
        if (useFilterChips) {
            setFilterChips(filterChipsProvider(language));
        }
        return () => {
            document.removeEventListener("keydown", handlePressKey);
        };
    }, []);

    const router = useRouter();

    const itemFilter = (item) => {
        const hasSearchTerm =
            !search || item.name.toLowerCase().includes(search.toLowerCase());
        const hasSelectedTypes =
            elementFilter.length == 0 ||
            elementFilter.every((t) => item.types.includes(t));
        const hasName = item.name.length > 0;
        return hasSearchTerm && hasSelectedTypes && hasName;
    };

    return (
        <>
            <div
                onClick={handleOpenPopup}
                style={{
                    flexGrow: doFlexGrow ? 1 : 0,
                    display: useFilterChips ? "flex" : "block",
                    justifyContent: "center",
                }}
            >
                {children}
            </div>
            {showPopup && (
                <div>
                    <button
                        className={styles.blurBackground}
                        onClick={handleClosePopup}
                    />
                    <div className={styles.popup}>
                        <div className={styles.popupNav}>
                            <img
                                src="/icons/trash.svg"
                                width="30"
                                height="33.33"
                                style={{ opacity: handleTrashButton ? 1 : 0 }}
                                className={styles.trashButton}
                                onClick={
                                    handleTrashButton
                                        ? async () => {
                                              handleClosePopup();
                                              await handleTrashButton().then(
                                                  (_) => router.refresh()
                                              );
                                          }
                                        : () => {}
                                }
                            />
                            <div className={styles.search}>
                                <img
                                    src="/icons/search.svg"
                                    width="30"
                                    height="30"
                                />
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    placeholder={translate("search", language)}
                                    onChange={(e) => setSearch(e.target.value)}
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
                        {useFilterChips && (
                            <div className={styles.filterChips}>
                                {filterChips.map((chip) => (
                                    <button
                                        className={styles.filterChip}
                                        onClick={() => modifyFilter(chip.name)}
                                        style={{
                                            background: chip.color,
                                            border: elementFilter.includes(
                                                chip.name
                                            )
                                                ? "2px solid black"
                                                : "none",
                                        }}
                                        key={chip.name}
                                    >
                                        {chip.displayName}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div
                            className={[
                                styles.selectionMenu,
                                styles.blackScroll,
                            ].join(" ")}
                            id="selection_menu"
                        >
                            {[
                                ...data,
                                useFilterChips
                                    ? { name: search, types: elementFilter }
                                    : { name: "" },
                            ]
                                .filter(itemFilter)
                                .map((item) => (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "3%",
                                        }}
                                        key={item.id ? item.id : item.name}
                                    >
                                        <button
                                            className={[
                                                styles.thinBorder,
                                                styles.staff,
                                            ].join(" ")}
                                            style={
                                                useFilterChips
                                                    ? {
                                                          background:
                                                              getBackgroundString(
                                                                  item.types,
                                                                  "90deg"
                                                              ),
                                                      }
                                                    : {}
                                            }
                                            onClick={async () => {
                                                handleClosePopup();
                                                await clickHandler(item).then(
                                                    (_) => router.refresh()
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                        {useFilterChips && item.id && (
                                            <div style={{ height: 45 }}>
                                                <InfoIcon
                                                    scale={45}
                                                    url={`/project/${item.id}`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}