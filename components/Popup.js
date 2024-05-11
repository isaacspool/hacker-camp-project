import React, { useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

export function Popup({ children }) {
    function handleClosePopup() {
        const popup = document.querySelector("#popup");
        popup.style.display = "none";
    }
    const handlePressExitKey = (e) => {
        if (e.key === "Escape" || e.key === "Esc" || e.key == "Enter") {
            handleClosePopup();
        }
    };
    const myRef = useRef(null);
    useEffect(() => {
        myRef.current.addEventListener("keydown", handlePressExitKey);
        return () => {
            myRef.current.removeEventListener("keydown", handlePressExitKey);
        };
    }, []);

    return (
        <div id="popup" style={{ display: "none" }}>
            <button
                className={styles.blurBackground}
                onClick={handleClosePopup}
                ref={myRef}
            >
                <div className={styles.popup}>{children}</div>
            </button>
        </div>
    );
}
