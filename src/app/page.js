import styles from "@/styles/Home.module.css";
import WeekLink from "./schedule/components/WeekLink";
import YearProvider from "@/components/YearProvider";
import YearSelect from "@/components/YearSelect";
import { getSearchParamsInt } from "@/lib/time";
import FormButton from "@/components/FormButton";

export default function Home({ searchParams }) {
    const year = getSearchParamsInt(
        searchParams.year,
        new Date().getFullYear()
    );
    return (
        <div className={styles.container}>
            <img
                src="/logo/hacker_brain.png"
                alt="logo"
                className={styles.bigLogo}
                width="92%"
                height="92%"
            />
            <FormButton scale={4} />
            <YearProvider defaultYear={year}>
                <h1 className={styles.grandTitle}>
                    Hacker Camp <YearSelect currentYear={year} />
                </h1>
                <div className={styles.weekList}>
                    {[...Array.from(Array(7).keys())]
                        .map((week) => week + 1)
                        .map((week) => {
                            return (
                                <WeekLink
                                    url={`/schedule/?week=${week}&`}
                                    week={week}
                                    css={styles.weekButton}
                                    hasHidden={false}
                                    key={week}
                                />
                            );
                        })}
                </div>
            </YearProvider>
        </div>
    );
}
