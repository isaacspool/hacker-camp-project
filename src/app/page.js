import styles from "@/styles/Home.module.css";
import WeekLink from "./schedule/components/WeekLink";
import YearProvider from "@/components/YearProvider";
import YearSelect from "@/components/YearSelect";
import { getSearchParamsInt } from "@/lib/searchParams";
import FormButton from "@/components/FormButton";
import HackerBrain from "@/components/HackerBrain";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home({ searchParams }) {
    const year = getSearchParamsInt(
        searchParams.year,
        new Date().getFullYear()
    );

    const handleLogout = async () => {
        "use server";

        cookies().delete("name");
        cookies().delete("secret");
        redirect("/login");
    };

    return (
        <div className={styles.container}>
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
            <FormButton scale={4} />
            <HackerBrain />
            <LogoutButton handleLogout={handleLogout} />
        </div>
    );
}
