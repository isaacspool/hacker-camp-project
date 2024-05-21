import styles from "../../styles/Form.module.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { NamePage } from "../../components/form/NamePage";
import { ProjectTypePage } from "../../components/form/ProjectTypePage";
import { CategoryPage } from "../../components/form/CategoryPage";
import { ParticipantsPage } from "../../components/form/ParticipantsPage";
import { ProjectDescriptionPage } from "../../components/form/ProjectDescriptionPage";
import { FullHackerCampLogo } from "../../components/FullHackerCampLogo";
import { LanguageButton } from "../../components/LanguageButton";
import { useRef } from "react";
import { SubmitButton } from "../../components/form/SubmitButton";
import { translate } from "../index";
import Link from "next/link";

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
    useEffect(() => {
        setTriangleLocation({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });
    }, []);
    const router = useRouter();

    const pageRef = useRef();

    useEffect(() => {
        if (formPage == 2 && window.innerWidth < window.innerHeight) {
            pageRef.current.style.height = "auto";
        } else {
            pageRef.current.style.height = "100%";
        }
    }, [formPage]);

    const [language, setLanguage] = useState("en");
    useEffect(() => {
        setLanguage(localStorage.getItem("language") || "en");
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

            <Head>
                <title>Project Form</title>
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

            <main
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

                <LanguageButton language={language} setLanguage={setLanguage} />

                <div className={styles.dots}>
                    {[...Array(PAGE_COUNT).keys()].map((dot, i) => {
                        if (i == formPage) {
                            return (
                                <div className={styles.filledDot} key={i}></div>
                            );
                        } else {
                            return (
                                <button
                                    onClick={handleClick}
                                    className={styles.emptyDot}
                                    value={i}
                                    key={i}
                                ></button>
                            );
                        }
                    })}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                    ref={pageRef}
                >
                    {getFormPage()}
                </div>
            </main>
        </div>
    );
}
