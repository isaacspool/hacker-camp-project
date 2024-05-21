import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import pageStyles from "../../styles/Project.module.css";
import { ScheduleWeek } from "../../components/ScheduleWeek";
import { useEffect, useState } from "react";
import { LanguageButton } from "../../components/LanguageButton";
import { getProjectById } from "../../components/ScheduleDay";
import { ProjectInformation } from "../../components/ProjectInformation";
import { getColorFromType } from "../../components/Project.js";

export default function ProjectPage() {
    const [language, setLanguage] = useState("en");
    const [projectNotFound, setProjectNotFound] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    let title = "Project ";
    let project = null;
    if (id && project == null && projectNotFound == false) {
        project = getProjectById(id);
        if (project) {
            title += project.name;
        } else {
            setProjectNotFound(true);
        }
    }
    useEffect(() => {
        setLanguage(localStorage.getItem("language") || "en");
    }, []);

    return (
        <div className={[styles.container, styles.blackScroll].join(" ")}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/logo/hacker_brain.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@100..900&display=swap"
                    rel="document"
                />
            </Head>

            <main>
                <LanguageButton language={language} setLanguage={setLanguage} />
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
                                        {project.categories.map(
                                            (category, i) => (
                                                <div
                                                    key={i}
                                                    className={
                                                        pageStyles.typeText
                                                    }
                                                >
                                                    <p>{category}</p>
                                                </div>
                                            )
                                        )}
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
                                        {project.types.map((type, i) => (
                                            <div
                                                className={pageStyles.typeText}
                                                style={{
                                                    background:
                                                        getColorFromType(type),
                                                }}
                                                key={i}
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
            </main>
        </div>
    );
}
