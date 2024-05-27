import HomeLink from "./components/HomeLink";
import styles from "@/styles/Home.module.css";
import ScheduleWeek from "./components/ScheduleWeek.js";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
    const week = searchParams.week;
    const year = searchParams.year;
    return {
        title: `Hacker Camp ${year} — Week ${week}`,
    };
}

export default function SchedulePage({ searchParams }) {
    const week = parseInt(searchParams.week);
    const year = parseInt(searchParams.year);
    return (
        <div className={[styles.container, styles.blackScroll].join(" ")}>
            <HomeLink />
            <ScheduleWeek week={week} year={year} />
        </div>
    );
}
