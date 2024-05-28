import prisma from "@/lib/prisma";
import ScheduleDay from "./ScheduleDay";
import styles from "@/styles/Home.module.css";

export default async function ScheduleWeek({ day, week, year }) {
    const weekFilter = { week, year };
    if (day == 0 || day) {
        weekFilter.day = day;
    }
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
            room: true,
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
    const rooms = await prisma.room.findMany();
    const staffList = await prisma.staff.findMany();

    const days = await prisma.day
        .findMany({
            where: weekFilter,
            include: { satellites: true, rundown: true },
        })
        .then((daysData) =>
            daysData.map((day) => {
                if (!day.satellites[0]) day.satellites[0] = "Satellite";
                if (!day.satellites[1]) day.satellites[1] = "Satellite";
                if (!day.rundown[0]) day.rundown[0] = "Rundown";
                if (!day.rundown[1]) day.rundown[1] = "Rundown";
                return day;
            })
        );

    return (
        <div
            className={styles.week}
            style={days.length == 1 ? { justifyContent: "center" } : {}}
        >
            {days.map((day) => (
                <ScheduleDay
                    dayInfo={{ week, year, day: day.day }}
                    dayKey={`day.${day.day}`}
                    databaseDayId={day.id}
                    databaseProjects={databaseProjects}
                    scheduledProjects={scheduledProjects.filter(
                        (project) => project.day.day == day.day
                    )}
                    satellites={day.satellites}
                    rundown={day.rundown}
                    rooms={rooms}
                    staffList={staffList}
                    presentationMode={days.length == 1}
                    key={day.id}
                />
            ))}
        </div>
    );
}
