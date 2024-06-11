"use client";

import { useYearContext } from "./YearProvider";

export default function WeekContainer({ children, previousYearElement }) {
    const { year, _ } = useYearContext();
    const currentYear = new Date().getFullYear();
    if (year == currentYear) {
        return children;
    } else {
        return previousYearElement;
    }
}
