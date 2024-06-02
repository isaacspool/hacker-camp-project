import styles from "@/styles/Project.module.css";
import ProjectInformation from "./ProjectInformation";
import { getColorFromType } from "@/lib/colors";
import Linkify from "linkify-react";
import englishLang from "@/../public/lang/en-us.json";
import Link from "next/link";

export default function ProjectDetails({ project }) {
    const date = new Date(project.createdAt);
    return (
        <div className={styles.infoContainer}>
            <ProjectInformation title={project.name}>
                {project.description && (
                    <Linkify
                        options={{ target: "_blank", className: styles.link }}
                    >
                        {project.description}
                    </Linkify>
                )}
            </ProjectInformation>
            {project.goals && (
                <ProjectInformation title="Goals">
                    <Linkify
                        options={{ target: "_blank", className: styles.link }}
                    >
                        {project.goals}
                    </Linkify>
                </ProjectInformation>
            )}
            {project.materials && (
                <ProjectInformation title="Materials">
                    <Linkify
                        options={{ target: "_blank", className: styles.link }}
                    >
                        {project.materials}
                    </Linkify>
                </ProjectInformation>
            )}
            {project.duration == 0.5 ? (
                <ProjectInformation title="Half Day" />
            ) : project.duration == 5 ? (
                <ProjectInformation title="All Week" />
            ) : project.duration == 1 ? (
                <ProjectInformation title="1 Day" />
            ) : project.duration ? (
                <ProjectInformation title={`${project.duration} Days Long`} />
            ) : (
                <></>
            )}
            {project.minParticipants && !project.maxParticipants && (
                <ProjectInformation
                    title={`At Least ${project.minParticipants} Campers`}
                />
            )}
            {!project.minParticipants && project.maxParticipants && (
                <ProjectInformation
                    title={`At Most ${project.maxParticipants} Campers`}
                />
            )}
            {project.minParticipants &&
                project.maxParticipants &&
                (project.minParticipants == project.maxParticipants ? (
                    <ProjectInformation
                        title={`Around ${project.maxParticipants} Campers`}
                    />
                ) : (
                    <ProjectInformation
                        title={`${project.minParticipants} to ${project.maxParticipants} Campers`}
                    />
                ))}
            {project.categories && project.categories.length > 0 && (
                <ProjectInformation>
                    <div
                        className={styles.infoContainer}
                        style={{
                            alignContent: "center",
                            height: "100%",
                        }}
                    >
                        {project.categories.map((category) => (
                            <div
                                key={category.name}
                                className={styles.typeText}
                            >
                                <p>{category.name}</p>
                            </div>
                        ))}
                    </div>
                </ProjectInformation>
            )}
            {project.types &&
                project.types.length > 0 &&
                !project.types.every((t) => t.length == 0) && (
                    <ProjectInformation stopFlexGrow={true}>
                        <div
                            className={styles.infoContainer}
                            style={{
                                flexDirection: "column",
                            }}
                        >
                            {project.types.map((type) => (
                                <div
                                    className={styles.typeText}
                                    style={{
                                        background: getColorFromType(type),
                                    }}
                                    key={type}
                                >
                                    <p>{type}</p>
                                </div>
                            ))}
                        </div>
                    </ProjectInformation>
                )}
            {project.creator && (
                <ProjectInformation
                    title={`Submitted by ${
                        project.creator.name
                    } on ${date.getDay()}/${date.getMonth()}/${
                        date.getFullYear() - 2000
                    }`}
                />
            )}
            {project.ScheduledProject &&
                project.ScheduledProject.length > 0 && (
                    <ProjectInformation title="Schedule">
                        {project.ScheduledProject.map(
                            (scheduledProject) => scheduledProject.day
                        ).map((day) => (
                            <>
                                <Link
                                    href={`/schedule/?week=${day.week}&year=${day.year}`}
                                >{`${englishLang["day." + day.day]} of Week ${
                                    day.week
                                }, ${day.year}`}</Link>
                                <br />
                            </>
                        ))}
                    </ProjectInformation>
                )}
        </div>
    );
}
