import WeekLink from "./schedule/components/WeekLink";
import YearProvider from "@/components/YearProvider";
import YearSelect from "@/components/YearSelect";
import { getSearchParamsInt } from "@/lib/searchParams";
import FormButton from "@/components/FormButton";
import HackerBrain from "@/components/HackerBrain";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

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
        <>
            <YearProvider defaultYear={year}>
                <h1 className="title-text lower-mobile lato margin-1 center-text">
                    Hacker Camp <YearSelect currentYear={year} />
                </h1>
                <div className="flex-cols center-all padding-2 grow-mobile margin-center">
                    {[...Array.from(Array(7).keys())]
                        .map((week) => week + 1)
                        .map((week) => {
                            return (
                                <WeekLink
                                    url={`/schedule/?week=${week}&`}
                                    week={week}
                                    css="fill rounded thick-border input-padding margin-2 large-text hover-darken lato flex center-all tiny-gap blur"
                                    hasHidden={false}
                                    key={week}
                                />
                            );
                        })}
                </div>
            </YearProvider>
            <HackerBrain />
            <LogoutButton handleLogout={handleLogout} />
        </>
    );
}
