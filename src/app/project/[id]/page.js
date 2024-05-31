import styles from "@/styles/Home.module.css";
import prisma from "@/lib/prisma";
import ProjectDetails from "./components/ProjectDetails.js";
import { getSearchParamsInt } from "@/lib/time.js";

export async function generateMetadata({ params }) {
    const id = getSearchParamsInt(params.id);
    const project = prisma.project.findFirst({ where: { id: id } });
    if (project) {
        return {
            title: `Project ${project.name}`,
        };
    }
    return {
        title: "Unknown Project",
    };
}

export default async function ProjectPage({ params }) {
    const id = getSearchParamsInt(params.id);
    const project = await prisma.project.findFirst({
        where: { id: id },
        include: { categories: true, creator: true },
    });
    return (
        <div className={[styles.container, styles.blackScroll].join(" ")}>
            <div style={{ padding: "3%" }}>
                {!project ? (
                    <div>
                        <h1>Project not found!</h1>
                        <p>ID is {id}.</p>{" "}
                    </div>
                ) : (
                    <ProjectDetails project={project} id={id} />
                )}
            </div>
        </div>
    );
}
