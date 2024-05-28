"use client";

import styles from "@/styles/Home.module.css";
import { useYearContext } from "./YearProvider";

export default function YearSelect() {
    const currentYear = new Date().getFullYear();
    const { year, setYear } = useYearContext();
    return (
        <select
            className={styles.yearSelect}
            value={year}
            onChange={(e) => setYear(e.target.value)}
        >
            {[...Array.from(Array(currentYear - 2020).keys())]
                .map((n) => currentYear - n)
                .map((n) => (
                    <option value={n} key={n}>
                        {n}
                    </option>
                ))}
        </select>
    );
}
