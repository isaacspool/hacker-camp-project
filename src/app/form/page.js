import styles from "../../styles/Form.module.css";
import { useLayoutEffect, useState } from "react";
import { NamePage } from "./components/NamePage";
import { ProjectTypePage } from "./components/ProjectTypePage";
import { CategoryPage } from "./components/CategoryPage";
import { ParticipantsPage } from "./components/ParticipantsPage";
import { ProjectDescriptionPage } from "./components/ProjectDescriptionPage";
import { FullHackerCampLogo } from "./components/FullHackerCampLogo";
import { SubmitButton } from "./components/SubmitButton";
import { translate } from "@/lib/translation";
import Link from "next/link";

export const metadata = {
    title: "Project Form",
};

export default function Form() {
    const [formPage, setFormPage] = useState(0);
    const PAGE_COUNT = 8;
    const handleClick = (e) => {
        setFormPage(e.target.value);
    };

    const [projectName, setProjectName] = useState("");
    const [projectTypes, setProjectTypes] = useState("");
    const [categories, setCategories] = useState("");
    const [participants, setParticipants] = useState(["", ""]);
    const [duration, setDuration] = useState(1);
    const [description, setDescription] = useState("");
    const [materials, setMaterials] = useState("");
    const [goals, setGoals] = useState("");

    const [triangleLocation, setTriangleLocation] = useState({ x: 0, y: 0 });
    useLayoutEffect(() => {
        setTriangleLocation({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });
    }, []);

    const getFormPage = () =>
        [
            <NamePage
                value={projectName}
                setValue={setProjectName}
                language={language}
            />,
            <ProjectTypePage
                triangleLocation={triangleLocation}
                setTriangleLocation={setTriangleLocation}
                setProjectTypes={setProjectTypes}
                language={language}
            />,

            <CategoryPage value={categories} setValue={setCategories} />,
            <ParticipantsPage
                participants={participants}
                setParticipants={setParticipants}
                duration={duration}
                setDuration={setDuration}
                language={language}
            />,
            <ProjectDescriptionPage
                title={translate("form.plan.title", language)}
                subtitle={translate("form.plan.subtitle", language)}
                value={description}
                setValue={setDescription}
            />,
            <ProjectDescriptionPage
                title={translate("form.materials.title", language)}
                subtitle={translate("form.materials.subtitle", language)}
                value={materials}
                setValue={setMaterials}
            />,
            <ProjectDescriptionPage
                title={translate("form.goals.title", language)}
                subtitle={translate("form.goals.subtitle", language)}
                value={goals}
                setValue={setGoals}
            >
                <FullHackerCampLogo />
            </ProjectDescriptionPage>,
            <SubmitButton
                language={language}
                formAnswers={{
                    projectName: projectName,
                    projectTypes: projectTypes,
                    categories: categories,
                    participants: participants,
                    duration: duration,
                    description: description,
                    materials: materials,
                    goals: goals,
                }}
            />,
        ][formPage];
    return (
        <div className={styles.container}>
            <svg
                style={{ visibility: "hidden", position: "absolute" }}
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="8"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>
            <div
                className={styles.main}
                style={{ width: "100%", height: "90vh" }}
            >
                <img
                    src="/logo/hacker_brain.png"
                    alt="logo"
                    className={styles.bigLogo}
                    width="92%"
                    height="92%"
                />
                <Link href="/" className={styles.backButton}>
                    <img src="/icons/back.svg" />
                </Link>
                <div className={styles.dots}>
                    {[...Array(PAGE_COUNT).keys()].map((dot) => {
                        if (dot == formPage) {
                            return (
                                <div
                                    className={styles.filledDot}
                                    key={dot}
                                ></div>
                            );
                        } else {
                            return (
                                <button
                                    onClick={handleClick}
                                    className={styles.emptyDot}
                                    value={dot}
                                    key={dot}
                                ></button>
                            );
                        }
                    })}
                </div>
                <div
                    className={styles.formPage}
                    style={formPage != 2 ? { height: "100%" } : {}}
                >
                    {getFormPage()}
                </div>
            </div>
        </div>
    );
}
