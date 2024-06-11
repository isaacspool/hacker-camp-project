"use client";

import { useRouter } from "next/navigation";
import { useYearContext } from "./YearProvider";

export default function YearSelect() {
    const currentYear = new Date().getFullYear();
    const { year, setYear } = useYearContext();
    const router = useRouter();
    return (
        <select
            className="bold title-text underline"
            value={year}
            onChange={(e) => {
                setYear(e.target.value);
                router.push("/?year=" + e.target.value);
            }}
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
