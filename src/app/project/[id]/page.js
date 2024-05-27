import styles from "@/styles/Home.module.css";
import pageStyles from "@/styles/Project.module.css";
import { ProjectInformation } from "./components/ProjectInformation.js";
import { getColorFromType } from "@/lib/colors";
import prisma from "@/lib/prisma";

export async function generateMetadata({ params }) {
    const id = params.id;
    const project = prisma.project.findFirst({ where: { id: parseInt(id) } });
    if (project) {
        return {
            title: `Project ${project.name}`,
        };
    }
    return {
        title: "Unknown Project",
    };
}

export default function ProjectPage() {
    return (
        <div className={[styles.container, styles.blackScroll].join(" ")}>
            <div style={{ padding: "3%" }}>
                {projectNotFound || !project ? (
                    <div>
                        <h1>Project not found!</h1>
                        <p>ID is {id}.</p>{" "}
                    </div>
                ) : (
                    <div className={pageStyles.infoContainer}>
                        <ProjectInformation title={project.name}>
                            {project.description}
                        </ProjectInformation>
                        {project.duration == 0.5 ? (
                            <ProjectInformation title="Half Day" />
                        ) : project.duration == 5 ? (
                            <ProjectInformation title="All Week" />
                        ) : project.duration ? (
                            <ProjectInformation
                                title={`${project.duration} Days Long`}
                            />
                        ) : (
                            <div style={{ display: "none" }} />
                        )}
                        {project.min_participants &&
                            project.max_participants && (
                                <ProjectInformation
                                    title={`${project.min_participants} to ${project.max_participants} Participants`}
                                />
                            )}
                        {project.categories && (
                            <ProjectInformation>
                                <div
                                    className={pageStyles.infoContainer}
                                    style={{
                                        alignContent: "center",
                                        height: "100%",
                                    }}
                                >
                                    {project.categories.map((category) => (
                                        <div
                                            key={category}
                                            className={pageStyles.typeText}
                                        >
                                            <p>{category}</p>
                                        </div>
                                    ))}
                                </div>
                            </ProjectInformation>
                        )}
                        {project.types && (
                            <ProjectInformation stopFlexGrow={true}>
                                <div
                                    className={pageStyles.infoContainer}
                                    style={{
                                        flexDirection: "column",
                                    }}
                                >
                                    {project.types.map((type) => (
                                        <div
                                            className={pageStyles.typeText}
                                            style={{
                                                background:
                                                    getColorFromType(type),
                                            }}
                                            key={type}
                                        >
                                            <p>{type}</p>
                                        </div>
                                    ))}
                                </div>
                            </ProjectInformation>
                        )}
                        {project.materials && (
                            <ProjectInformation title="Materials">
                                {project.materials}
                            </ProjectInformation>
                        )}
                        {project.goals && (
                            <ProjectInformation title="Goals">
                                {project.goals}
                            </ProjectInformation>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
