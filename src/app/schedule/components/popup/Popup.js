"use client";

import { useEffect, useState } from "react";
import { useSelectedProjectContext } from "../SelectedProjectProvider";
import { useRouterRefresh } from "@/lib/hooks";
import Search from "./Search";
import FilterChips from "./FilterChips";

export default function Popup({
    children,
    data,
    clickHandler,
    filterChipsProvider,
    doFlexGrow,
    handleTrashButton,
    handleModifyStaffOut,
    initElementFilter,
    warningMessage,
    customItemStyle,
    customItemFilter,
    itemIconProvider,
    useSearchAsOption,
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [search, setSearch] = useState("");
    const [elementFilter, setElementFilter] = useState(initElementFilter);

    const { _, setSelectedProject } = useSelectedProjectContext();

    const [isDeleted, setDeleted] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
        setSearch("");
        setSelectedProject(null);
        setElementFilter(initElementFilter);
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
        if (e.key == "Delete") {
            const deleteButton = document.getElementById("trash_button");
            if (deleteButton) {
                deleteButton.click();
            }
        }
    };

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

    const itemFilter = (item) => {
        const hasSearchTerm =
            !search || item.name.toLowerCase().includes(search.toLowerCase());
        const hasName = item.name.length > 0;
        return (
            hasSearchTerm &&
            hasName &&
            (!customItemFilter || customItemFilter(item, elementFilter))
        );
    };

    const handleItemClick = async (item) => {
        handleClosePopup();
        await clickHandler(item);
    };

    return (
        <>
            <div
                onClick={handleOpenPopup}
                style={{
                    flexGrow: doFlexGrow && !isDeleted ? 1 : 0,
                    display: isDeleted
                        ? "none"
                        : filterChipsProvider
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
                        className="blur fill-all hover-scale"
                        onClick={handleClosePopup}
                    />
                    <div
                        className={
                            "popup grow-mobile fixed-center white padding-2 flex-cols center-all rounded thick-border"
                        }
                    >
                        <Search
                            useTrashButton={handleTrashButton}
                            handleTrashButton={handleTrashButton}
                            handleClosePopup={handleClosePopup}
                            setDeleted={setDeleted}
                            setSearch={setSearch}
                        />
                        <FilterChips
                            filterChipsProvider={filterChipsProvider}
                            elementFilter={elementFilter}
                            setElementFilter={setElementFilter}
                            doesMultiSelect={!handleModifyStaffOut}
                        />
                        <div
                            className="black-scroll overflow-y flex-cols big-gap fill grow padding-3"
                            id="selection_menu"
                        >
                            {[
                                ...data,
                                useSearchAsOption
                                    ? { name: search, types: elementFilter }
                                    : { name: "" },
                            ]
                                .filter(itemFilter)
                                .filter((_, i) => i <= 99)
                                .map((item) => (
                                    <div
                                        className="flex center big-gap"
                                        key={item.id ? item.id : item.name}
                                    >
                                        <button
                                            className="medium-border rounded-30 padding-3 grow small-text hover-darken"
                                            style={
                                                customItemStyle &&
                                                customItemStyle(item)
                                            }
                                            onClick={handleItemClick.bind(
                                                null,
                                                item
                                            )}
                                        >
                                            {item.name}
                                        </button>
                                        {itemIconProvider &&
                                            itemIconProvider(item)}
                                    </div>
                                ))}
                            {warningMessage &&
                                warningMessage(data.filter(itemFilter))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
