import ProjectInformation from "./ProjectInformation";
import { getColorFromType } from "@/lib/colors";
import Linkify from "linkify-react";
import englishLang from "@/../public/lang/en-us.json";
import Link from "next/link";
import Translate from "./Translate";

export default function ProjectDetails({ project }) {
    const date = new Date(project.createdAt);
    return (
        <div className="flex-wrap lower-mobile">
            <ProjectInformation title={project.name} doNotTranslate>
                {project.description && (
                    <Linkify
                        options={{ target: "_blank", className: "blue-link" }}
                    >
                        {project.description}
                    </Linkify>
                )}
            </ProjectInformation>
            {project.goals && (
                <ProjectInformation title={["project.goals"]}>
                    <Linkify
                        options={{ target: "_blank", className: "blue-link" }}
                    >
                        {project.goals}
                    </Linkify>
                </ProjectInformation>
            )}
            {project.materials && (
                <ProjectInformation title={["project.materials"]}>
                    <Linkify
                        options={{ target: "_blank", className: "blue-link" }}
                    >
                        {project.materials}
                    </Linkify>
                </ProjectInformation>
            )}
            {project.duration == 0.5 ? (
                <ProjectInformation title={["project.time.half"]} />
            ) : project.duration == 5 ? (
                <ProjectInformation title={["project.time.week"]} />
            ) : project.duration == 1 ? (
                <ProjectInformation title={[project.duration, "form.day"]} />
            ) : project.duration ? (
                <ProjectInformation title={[project.duration, "form.days"]} />
            ) : (
                <></>
            )}
            {project.minParticipants && !project.maxParticipants && (
                <ProjectInformation
                    title={[
                        "minimum",
                        project.minParticipants,
                        "project.campers",
                    ]}
                />
            )}
            {!project.minParticipants && project.maxParticipants && (
                <ProjectInformation
                    title={[
                        "maximum",
                        project.maxParticipants,
                        "project.campers",
                    ]}
                />
            )}
            {project.minParticipants &&
                project.maxParticipants &&
                (project.minParticipants == project.maxParticipants ? (
                    <ProjectInformation
                        title={[
                            "project.around",
                            project.maxParticipants,
                            "project.campers",
                        ]}
                    />
                ) : (
                    <ProjectInformation
                        title={[
                            project.minParticipants,
                            "form.to",
                            project.maxParticipants,
                            "project.campers",
                        ]}
                    />
                ))}
            {project.categories && project.categories.length > 0 && (
                <ProjectInformation reactKey="categories">
                    <div
                        className="flex-wrap big-gap center-all"
                        style={{
                            alignContent: "center",
                            height: "100%",
                        }}
                    >
                        {project.categories.map((category) => (
                            <div
                                key={category.name}
                                className="thin-border rounded title-padding-px center-text margin-1"
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
                    <ProjectInformation stopFlexGrow={true} reactKey="types">
                        <div
                            className="flex-wrap big-gap"
                            style={{
                                flexDirection: "column",
                            }}
                        >
                            {project.types.map((type) => (
                                <div
                                    className="thin-border rounded title-padding-px center-text margin-3"
                                    style={{
                                        background: getColorFromType(type),
                                    }}
                                    key={type}
                                >
                                    <Translate
                                        text={[`type.${type.toLowerCase()}`]}
                                    />
                                </div>
                            ))}
                        </div>
                    </ProjectInformation>
                )}
            {project.creator && (
                <ProjectInformation
                    title={[
                        "project.submitted.by",
                        project.creator.name,
                        "project.submitted.on",
                        `${date.getDate()}/${date.getMonth() + 1}/${
                            date.getFullYear() - 2000
                        }`,
                    ]}
                />
            )}
            {project.ScheduledProject &&
                project.ScheduledProject.length > 0 && (
                    <ProjectInformation title={["project.schedule"]}>
                        {project.ScheduledProject.map(
                            (scheduledProject) => scheduledProject.day
                        ).map((day) => (
                            <>
                                <Link
                                    href={{
                                        pathname: "/schedule/",
                                        query: {
                                            week: day.week.week,
                                            year: day.week.year,
                                        },
                                    }}
                                    key={day}
                                >
                                    <Translate
                                        text={[
                                            `day.${day.day}`,
                                            "week",
                                            `${day.week.week},`,
                                            day.week.year,
                                        ]}
                                    />
                                </Link>
                                <br />
                            </>
                        ))}
                    </ProjectInformation>
                )}
        </div>
    );
}
