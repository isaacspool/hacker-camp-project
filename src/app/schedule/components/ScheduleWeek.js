import prisma from "@/lib/prisma";
import ScheduleDay from "./ScheduleDay";
import styles from "@/styles/Home.module.css";

export default async function ScheduleWeek({ week, year }) {
    const weekFilter = { week, year };
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
        <div className={styles.week}>
            {days.map((day, i) => (
                <ScheduleDay
                    dayKey={`day.${i}`}
                    databaseDayId={day.id}
                    databaseProjects={databaseProjects}
                    scheduledProjects={scheduledProjects.filter(
                        (project) => project.day.day == i
                    )}
                    satellites={day.satellites}
                    rundown={day.rundown}
                    rooms={rooms}
                    staffList={staffList}
                    key={day.id}
                />
            ))}
        </div>
    );
}
