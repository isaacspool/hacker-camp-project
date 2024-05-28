"use client";

import { useFormPageContext } from "./FormPageProvider";
import styles from "@/styles/Form.module.css";

const PAGE_COUNT = 8;

export default function FormDots() {
    const { formPage, setFormPage } = useFormPageContext();
    const handleClick = (e) => {
        setFormPage(e.target.value);
    };
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
