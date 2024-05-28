import HomeLink from "./components/HomeLink";
import styles from "@/styles/Home.module.css";
import ScheduleWeek from "./components/ScheduleWeek.js";
import YearProvider from "@/components/YearProvider";
import { getSearchParamsInt } from "@/lib/time";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
    const week = searchParams.week;
    const year = searchParams.year;
    return {
        title: `Hacker Camp ${year} — Week ${week}`,
    };
}

export default function SchedulePage({ searchParams }) {
    const week = getSearchParamsInt(searchParams.week, 1);
    const year = getSearchParamsInt(
        searchParams.year,
        new Date().getFullYear()
    );
    const day = getSearchParamsInt(searchParams.day, null);
    return (
        <div className={[styles.container, styles.blackScroll].join(" ")}>
            <YearProvider defaultYear={year}>
                <HomeLink
                    url={day == 0 || day ? `/schedule/?week=${week}&` : "/?"}
                    week={week}
                    css={styles.weekTitle}
                    hasHidden={true}
                />
            </YearProvider>
            <ScheduleWeek week={week} year={year} day={day} />
        </div>
    );
}
