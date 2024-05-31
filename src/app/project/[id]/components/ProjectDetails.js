import styles from "@/styles/Project.module.css";
import ProjectInformation from "./ProjectInformation";
import { getColorFromType } from "@/lib/colors";
import Linkify from "linkify-react";

export default function ProjectDetails({ project }) {
    return (
        <div className={styles.infoContainer}>
            <ProjectInformation title={project.name}>
                <Linkify options={{ target: "_blank", className: styles.link }}>
                    {project.description}
                </Linkify>
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
            {project.minParticipants && project.maxParticipants && (
                <ProjectInformation
                    title={`${project.minParticipants} to ${project.maxParticipants} Campers`}
                />
            )}
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
            {project.types && project.types.length > 0 && (
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
        </div>
    );
}
