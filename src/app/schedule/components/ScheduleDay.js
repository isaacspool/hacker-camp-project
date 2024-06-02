import styles from "@/styles/Home.module.css";
import Project from "./Project";
import Popup from "./Popup";
import DayTitle from "./DayTitle";
import DayDetails from "./DayDetails";
import prisma from "@/lib/prisma";

export default function ScheduleDay({
    dayInfo,
    dayKey,
    databaseDayId,
    databaseProjects,
    scheduledProjects,
    satellites,
    rundown,
    rooms,
    staffList,
    presentationMode,
    staffOut,
}) {
    const currentYear = new Date().getFullYear();

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

    const handleModifyStaffOut = async (update) => {
        "use server";
        await prisma.day.update({
            where: dayInfo,
            data: {
                out: update,
            },
        });
    };

    const staffInProjects = staffList
        .filter((s) =>
            scheduledProjects.find((sp) =>
                sp.staff.find((spStaff) => spStaff.name == s.name)
            )
        )
        .concat(satellites, rundown);

    return (
        <div className={styles.day}>
            <DayTitle
                dayKey={dayKey}
                dayInfo={dayInfo}
                presentationMode={presentationMode}
            />
            <div className={[styles.border, styles.projectList].join(" ")}>
                {(!presentationMode || dayInfo.year != currentYear) && (
                    <DayDetails
                        databaseId={databaseDayId}
                        rundownStaff={rundown}
                        satelliteStaff={satellites}
                        staffList={staffList}
                        isCurrentYear={dayInfo.year == currentYear}
                        staffOut={staffOut}
                        staffInProjects={staffInProjects}
                        year={dayInfo.year}
                        handleModifyStaffOut={handleModifyStaffOut}
                    />
                )}
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
                            location={project.rooms[0]}
                            setLocation={async (location) => {
                                "use server";
                                await handleUpdateProject(project.id, {
                                    rooms: project.rooms[0]?.id
                                        ? {
                                              connect: { id: location.id },
                                              disconnect: {
                                                  id: project.rooms[0]?.id,
                                              },
                                          }
                                        : {
                                              connect: { id: location.id },
                                          },
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
                            presentationMode={presentationMode}
                            staffInProjects={staffInProjects}
                            staffOut={staffOut}
                            dayInfo={dayInfo}
                            key={project.id}
                        />
                    );
                })}
                {!presentationMode && (
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
                )}
            </div>
        </div>
    );
}
