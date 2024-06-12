import WeekLink from "./schedule/components/WeekLink";
import YearProvider from "@/components/YearProvider";
import YearSelect from "@/components/YearSelect";
import { getSearchParamsInt } from "@/lib/searchParams";
import HackerBrain from "@/components/HackerBrain";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditNotesButton from "@/components/EditNotesButton";
import WeekNotes from "@/components/WeekNotes";
import EditingNotesProvider from "@/components/EditingNotesProvider";
import WeekContainer from "@/components/WeekContainer";
import prisma from "@/lib/prisma";

export default async function Home({ searchParams }) {
    const currentYear = new Date().getFullYear();
    const year = getSearchParamsInt(searchParams.year, currentYear);

    const handleLogout = async () => {
        "use server";

        cookies().delete("name");
        cookies().delete("secret");
        redirect("/login");
    };

    const weekLinkElement = (week) => (
        <WeekLink
            url={{
                pathname: "/schedule",
                query: { week },
            }}
            week={week}
            css="fill rounded thick-border input-padding margin-2 large-text hover-darken lato flex center-all tiny-gap blur"
            hasHidden={false}
        />
    );

    const weeks = await prisma.week.findMany({ where: { year } });

    const handleEditNote = async (week, noteYear, notes) => {
        "use server";

        await prisma.week
            .findFirst({ where: { year: noteYear, week } })
            .then(async (databaseWeek) => {
                await prisma.week.update({
                    where: { id: databaseWeek.id },
                    data: { notes },
                });
            });
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
                                <div key={week} className="fill">
                                    <WeekContainer
                                        previousYearElement={
                                            <>
                                                {weekLinkElement(week)}
                                                {weeks
                                                    .find((w) => w.week == week)
                                                    .notes?.split("\n")
                                                    ?.map((line, i) => (
                                                        <p
                                                            className="fill center-text small-text padding-1 blur"
                                                            key={i}
                                                        >
                                                            {line}
                                                        </p>
                                                    ))}
                                            </>
                                        }
                                    >
                                        <EditingNotesProvider>
                                            <div className="flex small-gap center-all">
                                                {weekLinkElement(week)}
                                                <EditNotesButton week={week} />
                                            </div>
                                            <WeekNotes
                                                week={week}
                                                databaseNote={
                                                    weeks.find(
                                                        (w) => w.week == week
                                                    ).notes
                                                }
                                                handleEditNote={handleEditNote}
                                            />
                                        </EditingNotesProvider>
                                    </WeekContainer>
                                </div>
                            );
                        })}
                </div>
            </YearProvider>
            <HackerBrain />
            <LogoutButton
                handleLogout={handleLogout}
                loggedInUser={cookies().get("name").value}
            />
        </>
    );
}
