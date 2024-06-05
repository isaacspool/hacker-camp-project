import styles from "@/styles/Home.module.css";
import prisma from "@/lib/prisma";
import ProjectDetails from "./components/ProjectDetails.js";
import { getSearchParamsInt } from "@/lib/searchParams.js";
import HackerBrain from "@/components/HackerBrain.js";

export async function generateMetadata({ params }) {
    const id = getSearchParamsInt(params.id);
    const project = await prisma.project.findFirst({ where: { id } });

    return {
        title: project ? project.name : "Unknown",
    };
}

export default async function ProjectPage({ params }) {
    const id = getSearchParamsInt(params.id);
    const project = await prisma.project.findFirst({
        where: { id },
        include: {
            categories: true,
            creator: true,
            ScheduledProject: {
                include: { day: { include: { week: true } } },
            },
        },
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

            <HackerBrain />
        </div>
    );
}
