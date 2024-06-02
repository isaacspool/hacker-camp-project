"use client";

import { useEffect } from "react";
import { useFormPageContext } from "./FormPageProvider";
import styles from "@/styles/Form.module.css";

const PAGE_COUNT = 8;

export default function FormDots() {
    const { formPage, setFormPage } = useFormPageContext();
    const handleClick = (e) => {
        setFormPage(parseInt(e.target.value));
    };
    const handleKeyPress = (e) => {
        if (e.key == "Enter") {
            setFormPage((prev) => {
                if (e.shiftKey) {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        return prev;
                    }
                } else {
                    if (prev < 4) {
                        return prev + 1;
                    } else {
                        return prev;
                    }
                }
            });
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    return (
        <div className={styles.dots}>
            {[...Array(PAGE_COUNT).keys()].map((dot) => {
                if (dot == formPage) {
                    return <div className={styles.filledDot} key={dot}></div>;
                } else {
                    return (
                        <button
                            onClick={handleClick}
                            className={styles.emptyDot}
                            value={dot}
                            key={dot}
                        ></button>
                    );
                }
            })}
        </div>
    );
}
