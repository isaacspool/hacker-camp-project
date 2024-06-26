import Project from "./project/Project";
import Popup from "./popup/Popup";
import DayTitle from "./DayTitle";
import DayDetails from "./DayDetails";
import prisma from "@/lib/prisma";
import Image from "next/image";
import NewProjectPopup from "./popup/NewProjectPopup";

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
            where: { id: dayInfo.id },
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
        .concat(satellites);

    return (
        <div className="flex-cols medium-gap width-540">
            <DayTitle
                dayKey={dayKey}
                dayInfo={dayInfo}
                presentationMode={presentationMode}
            />
            <div
                className="center max-height thick-border rounded-30 flex-cols small-gap hide-scroll overflow-x-hidden overflow-y width-540 padding-2"
                style={{ background: "rgba(255,255,255,0.8)" }}
            >
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
                {scheduledProjects.map((project) => {
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
                            handleModifyStaffOut={handleModifyStaffOut}
                            key={project.id}
                        />
                    );
                })}
                {!presentationMode && (
                    <div className="flex center-all width-500">
                        <NewProjectPopup
                            data={databaseProjects}
                            clickHandler={handleSelectProject}
                        >
                            <Image
                                src="/icons/add.svg"
                                width="80"
                                height="80"
                                alt="add button"
                                className="hover-rotate hover-opaque hover-scale"
                            />
                        </NewProjectPopup>
                    </div>
                )}
            </div>
        </div>
    );
}
