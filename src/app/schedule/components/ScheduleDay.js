import styles from "@/styles/Home.module.css";
import Project from "./Project";
import Popup from "./Popup";
import DayTitle from "./DayTitle";
import DayDetails from "./DayDetails";
import prisma from "@/lib/prisma";

export default function ScheduleDay({
    dayKey,
    databaseDayId,
    databaseProjects,
    scheduledProjects,
    satellites,
    rundown,
    rooms,
    staffList,
}) {
    const handleDeletion = async (projectId) => {
        "use server";
        await prisma.scheduledProject.delete({ where: { id: projectId } });
    };
    const handleUpdateProject = async (projectId, update) => {
        "use server";
        await prisma.scheduledProject.update({
            where: { id: projectId },
            data: update,
        });
    };
    const scheduleProject = async (project) => {
        "use server";
        await prisma.scheduledProject.create({
            data: {
                name: project.name,
                project: {
                    connect: { id: project.id },
                },
                day: {
                    connect: {
                        id: databaseDayId,
                    },
                },
            },
        });
    };
    const handleSelectProject = async (project) => {
        "use server";
        if (!project.id) {
            await prisma.project
                .create({
                    data: {
                        name: project.name,
                        types: project.types,
                    },
                })
                .then(async (p) => await scheduleProject(p));
        } else {
            await scheduleProject(project);
        }
    };

    return (
        <div className={styles.day}>
            <DayTitle dayKey={dayKey} />
            <DayDetails
                databaseId={databaseDayId}
                rundownStaff={rundown}
                satelliteStaff={satellites}
                staffList={staffList}
            />
            <div className={[styles.border, styles.projectList].join(" ")}>
                {scheduledProjects.map((project, i) => {
                    return (
                        <Project
                            staff={project.staff}
                            updateStaff={async (edits) => {
                                "use server";
                                await handleUpdateProject(project.id, {
                                    staff: edits,
                                });
                            }}
                            location={project.room}
                            setLocation={async (location) => {
                                "use server";
                                await handleUpdateProject(project.id, {
                                    roomId: location.id,
                                });
                            }}
                            databaseId={project.project.id}
                            scheduledProjectId={project.id}
                            projectName={project.name}
                            setProjectName={async (name) => {
                                "use server";
                                return await handleUpdateProject(project.id, {
                                    name: name,
                                });
                            }}
                            handleDeletion={handleDeletion}
                            types={project.project.types}
                            rooms={rooms}
                            staffList={staffList}
                            key={project.id}
                        />
                    );
                })}
                <div className={styles.addButtonContainer}>
                    <Popup
                        data={databaseProjects}
                        clickHandler={handleSelectProject}
                        useFilterChips={true}
                        doFlexGrow={false}
                    >
                        <img
                            src="/icons/add.svg"
                            width="80"
                            height="80"
                            className={styles.addButton}
                        />
                    </Popup>
                </div>
            </div>
        </div>
    );
}
