import prisma from "@/lib/prisma";
import ScheduleDay from "./ScheduleDay";

export default async function ScheduleWeek({ day, week, year }) {
    const weekFilter = { week: { week, year } };
    if (day == 0 || day) {
        weekFilter.day = day;
    }
    const currentYear = new Date().getFullYear();
    const scheduledProjects = await prisma.scheduledProject.findMany({
        where: { day: weekFilter },
        include: {
            project: {
                select: {
                    id: true,
                    types: true,
                },
            },
            staff: true,
            day: true,
            rooms: true,
        },
        orderBy: { id: "asc" },
    });
    const databaseProjects = await prisma.project.findMany({
        select: {
            id: true,
            name: true,
            types: true,
        },
        orderBy: { id: "asc" },
    });
    const rooms = await prisma.room.findMany({
        where: {
            years: {
                has: year,
            },
        },
    });
    const staffList = await prisma.staff.findMany();

    const days = await prisma.day.findMany({
        where: weekFilter,
        include: {
            satellites: { orderBy: { id: "asc" } },
            rundown: { orderBy: { id: "asc" } },
            out: { orderBy: { id: "asc" } },
        },
    });

    return (
        <div
            className={"flex big-gap max-height"}
            style={
                days.length == 1
                    ? { justifyContent: "center" }
                    : { padding: "15px 2% 0 2%" }
            }
        >
            {days.map((day) => (
                <ScheduleDay
                    dayInfo={{ id: day.id, week, year, day: day.day }}
                    dayKey={`day.${day.day}`}
                    databaseDayId={day.id}
                    databaseProjects={databaseProjects}
                    scheduledProjects={scheduledProjects.filter(
                        (project) => project.day.day == day.day
                    )}
                    satellites={day.satellites}
                    rundown={day.rundown}
                    rooms={rooms}
                    staffList={staffList.filter(
                        (s) =>
                            !s.name.startsWith("Satellit") &&
                            !s.name.startsWith("Rundow")
                    )}
                    presentationMode={days.length == 1 || year != currentYear}
                    staffOut={day.out}
                    key={day.id}
                />
            ))}
        </div>
    );
}
