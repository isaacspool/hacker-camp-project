"use client";

import { useEffect, useState, useTransition } from "react";
import styles from "@/styles/Home.module.css";
import { translate } from "@/lib/translation";
import { useSelectedProjectContext } from "./SelectedProjectProvider";
import { useLanguageContext } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
import { getBackgroundString, getColorFromType } from "@/lib/colors";
import InfoIcon from "./InfoIcon";
import { usePopupContext } from "./PopupProvider";
import { useTempStaffContext } from "./TempStaffProvider";

/**
 * https://github.com/vercel/next.js/discussions/58520
 * Wrapper around `router.refresh()` from `next/navigation` `useRouter()` to return Promise, and resolve after refresh completed
 * @returns Refresh function
 */
export function useRouterRefresh() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [resolve, setResolve] = useState(null);
    const [isTriggered, setIsTriggered] = useState(false);

    const refresh = () => {
        return new Promise((resolve, reject) => {
            setResolve(() => resolve);
            startTransition(() => {
                router.refresh();
            });
        });
    };

    useEffect(() => {
        if (isTriggered && !isPending) {
            if (resolve) {
                resolve(null);

                setIsTriggered(false);
                setResolve(null);
            }
        }
        if (isPending) {
            setIsTriggered(true);
        }
    }, [isTriggered, isPending, resolve]);

    return refresh;
}

function useFilter(initFilter) {
    const [elementFilter, setElementFilter] = useState(initFilter);
    const modifyFilter = (name) => {
        return elementFilter.includes(name)
            ? setElementFilter((prev) => prev.filter((f) => f !== name))
            : setElementFilter((prev) => [...prev, name]);
    };
    const clearFilter = () => {
        setElementFilter([]);
    };
    const resetFilter = () => {
        setElementFilter(initFilter);
    };
    return [elementFilter, modifyFilter, clearFilter, resetFilter];
}

const filterChipsProviderProject = (language) => {
    return ["Creative", "Engineering", "Analytical"].map((type) => ({
        displayName: translate(`type.${type.toLowerCase()}`, language),
        name: type,
        color: getColorFromType(type),
    }));
};

const filterChipsProviderStaff = () => {
    return [
        ["Out", "#d14c3b6b"],
        ["Unassigned", "#f7cd6a6b"],
        ["Assigned", "#79d1606b"],
    ].map((chip) => ({
        displayName: chip[0],
        name: chip[0],
        color: chip[1],
    }));
};

export default function Popup({
    children,
    data,
    clickHandler,
    useFilterChips,
    doFlexGrow,
    handleTrashButton,
    staffOut,
    staffInProjects,
    year,
    handleModifyStaffOut,
    addTempStaff,
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [search, setSearch] = useState("");
    const [elementFilter, modifyFilter, clearFilter, resetFilter] = useFilter(
        handleModifyStaffOut ? ["Unassigned"] : []
    );

    const { _, setSelectedProject } = useSelectedProjectContext();
    const language = useLanguageContext();

    const [isDeleted, setDeleted] = useState(false);

    const refresh = useRouterRefresh();

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
        setSearch("");
        setSelectedProject(null);
        resetFilter();
    };

    const handleDeleteElement = () => {
        handleClosePopup();
        setDeleted(true);
        const deleteStaff = async () => {
            await handleTrashButton().then(() =>
                refresh().then(() => setDeleted(false))
            );
        };
        deleteStaff();
    };

    const handlePressKey = (e) => {
        if (!showPopup) return;
        if (e.key === "Escape") {
            handleClosePopup();
        }
        if (e.key == "Enter") {
            const selectionMenu = document.getElementById("selection_menu");
            if (selectionMenu && selectionMenu.children.length == 1) {
                selectionMenu.children[0].children[0].click();
            }
        }
        if (
            handleTrashButton &&
            (e.key == "Delete" ||
                (e.key == "Backspace" &&
                    !document.getElementById("search").matches(":focus")))
        ) {
            handleDeleteElement();
        }
    };

    const filterChips = useFilterChips
        ? handleModifyStaffOut
            ? filterChipsProviderStaff()
            : filterChipsProviderProject(language)
        : null;

    useEffect(() => {
        setDeleted(false);
    }, []);

    useEffect(() => {
        if (showPopup) {
            document.addEventListener("keydown", handlePressKey);

            const searchInput = document.getElementById("search");
            if (searchInput) searchInput.focus();
        }
        return () => {
            document.removeEventListener("keydown", handlePressKey);
        };
    }, [showPopup]);

    const router = useRouter();

    const itemFilter = (item) => {
        const hasSearchTerm =
            !search || item.name.toLowerCase().includes(search.toLowerCase());
        const hasSelectedTypes =
            handleModifyStaffOut ||
            elementFilter.length == 0 ||
            elementFilter.every((t) => item.types.includes(t));
        const isStaffOut =
            !staffOut ||
            !elementFilter.find((e) => e == "Out") ||
            staffOut.find((s) => s.name == item.name);
        const isStaffInProject =
            !staffInProjects ||
            !elementFilter.find((e) => e == "Assigned") ||
            staffInProjects.find((e) => e.name == item.name);
        const isStaffUnassigned =
            !year ||
            !item.years ||
            !elementFilter.find((e) => e == "Unassigned") ||
            (item.years.includes(year) &&
                !staffInProjects?.find((e) => e.name == item.name) &&
                !staffOut?.find((e) => e.name == item.name));
        const hasName = item.name.length > 0;
        return (
            hasSearchTerm &&
            hasSelectedTypes &&
            hasName &&
            isStaffOut &&
            isStaffUnassigned &&
            isStaffInProject
        );
    };

    const { __, setDisplayValue } = usePopupContext();
    const { tempStaff, setTempStaff } = useTempStaffContext();

    return (
        <>
            <div
                onClick={handleOpenPopup}
                style={{
                    flexGrow: doFlexGrow && !isDeleted ? 1 : 0,
                    display: isDeleted
                        ? "none"
                        : useFilterChips
                        ? "flex"
                        : "block",
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
                                        ? handleDeleteElement
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
                                        onClick={() => {
                                            if (
                                                handleModifyStaffOut &&
                                                elementFilter
                                            ) {
                                                clearFilter();
                                            }
                                            modifyFilter(chip.name);
                                        }}
                                        style={{
                                            background: chip.color,
                                            border: elementFilter.includes(
                                                chip.name
                                            )
                                                ? "2px solid black"
                                                : "none",
                                            margin: elementFilter.includes(
                                                chip.name
                                            )
                                                ? "-2px 0px"
                                                : "2px",
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
                                useFilterChips && !handleModifyStaffOut
                                    ? { name: search, types: elementFilter }
                                    : { name: "" },
                            ]
                                .filter(itemFilter)
                                .filter((_, i) => i <= 99)
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
                                                useFilterChips && item.types
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
                                                if (setDisplayValue) {
                                                    setDisplayValue(item.name);
                                                }
                                                if (addTempStaff) {
                                                    setTempStaff([
                                                        ...tempStaff,
                                                        item.name,
                                                    ]);
                                                }
                                                await clickHandler(item).then(
                                                    () =>
                                                        refresh().then(() => {
                                                            if (setTempStaff) {
                                                                setTempStaff(
                                                                    []
                                                                );
                                                            }
                                                        })
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                        {useFilterChips &&
                                            item.id &&
                                            item.types && (
                                                <div style={{ height: 45 }}>
                                                    <InfoIcon
                                                        scale={45}
                                                        url={`/project/${item.id}`}
                                                    />
                                                </div>
                                            )}
                                        {useFilterChips &&
                                            staffInProjects &&
                                            staffOut &&
                                            year &&
                                            !staffInProjects.find(
                                                (s) => s.name == item.name
                                            ) &&
                                            !staffOut.find(
                                                (s) => s.name == item.name
                                            ) &&
                                            item.years.includes(year) && (
                                                <img
                                                    src="/icons/close.svg"
                                                    width="25"
                                                    height="25"
                                                    onClick={async () =>
                                                        await handleModifyStaffOut(
                                                            {
                                                                connect: {
                                                                    name: item.name,
                                                                },
                                                            }
                                                        ).then((_) =>
                                                            router.refresh()
                                                        )
                                                    }
                                                />
                                            )}
                                        {useFilterChips &&
                                            staffOut &&
                                            staffOut.find(
                                                (s) => s.name == item.name
                                            ) && (
                                                <img
                                                    src="/icons/add.svg"
                                                    width="47"
                                                    height="47"
                                                    onClick={async () =>
                                                        await handleModifyStaffOut(
                                                            {
                                                                disconnect: {
                                                                    name: item.name,
                                                                },
                                                            }
                                                        ).then((_) =>
                                                            router.refresh()
                                                        )
                                                    }
                                                />
                                            )}
                                    </div>
                                ))}
                            {useFilterChips &&
                                !handleModifyStaffOut &&
                                data.filter(itemFilter).length > 100 && (
                                    <p style={{ margin: "auto" }}>
                                        Only showing 100 results.
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
