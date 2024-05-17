import styles from "../../styles/Form.module.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { NamePage } from "../../components/form/NamePage";
import { ProjectTypePage } from "../../components/form/ProjectTypePage";
import { CategoryPage } from "../../components/form/CategoryPage";
import { LocationPage } from "../../components/form/LocationPage";
import { ParticipantsPage } from "../../components/form/ParticipantsPage";
import { ProjectDescriptionPage } from "../../components/form/ProjectDescriptionPage";
import { FullHackerCampLogo } from "../../components/FullHackerCampLogo";
import { LanguageButton } from "../../components/LanguageButton";
import { useRef } from "react";
import Link from "next/link";

export default function Form() {
    const [formPage, setFormPage] = useState(0);
    const PAGE_COUNT = 9;
    const handleClick = (e) => {
        setFormPage(e.target.value);
    };

    const [projectName, setProjectName] = useState("");
    const [projectTypes, setProjectTypes] = useState("");
    const [categories, setCategories] = useState("");
    const [checkboxAnswers, setCheckboxAnswers] = useState([
        { "Pink Room": false, "LEGO Room": false, Library: false },
        { Laptops: false, Desktops: false },
        { Outside: false, Garden: false },
    ]);
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
                <link rel="icon" href="/hacker_brain.png" />
            </Head>

            <main
                className={styles.main}
                style={{ width: "100%", height: "90vh" }}
            >
                {/* <Link href="/form" className={styles.newProjectButton}>
                    <div className={styles.buttonBackground} />
                    <img src="/form_button.svg" />
                </Link> */}
                <img
                    src="/hacker_brain.png"
                    alt="logo"
                    className={styles.bigLogo}
                    width="92%"
                    height="92%"
                />

                <Link href="/" className={styles.backButton}>
                    <img src="/back_button.svg" />
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
                    {formPage == 0 ? (
                        <NamePage
                            value={projectName}
                            setValue={setProjectName}
                            language={language}
                        />
                    ) : formPage == 1 ? (
                        <ProjectTypePage
                            triangleLocation={triangleLocation}
                            setTriangleLocation={setTriangleLocation}
                            setProjectTypes={setProjectTypes}
                            language={language}
                        />
                    ) : formPage == 2 ? (
                        <CategoryPage
                            value={categories}
                            setValue={setCategories}
                        />
                    ) : formPage == 3 ? (
                        <LocationPage
                            value={checkboxAnswers}
                            setValue={setCheckboxAnswers}
                        />
                    ) : formPage == 4 ? (
                        <ParticipantsPage
                            participants={participants}
                            setParticipants={setParticipants}
                            duration={duration}
                            setDuration={setDuration}
                            language={language}
                        />
                    ) : formPage == 5 ? (
                        <ProjectDescriptionPage
                            title="What do you plan to do?"
                            subtitle="The long story."
                            value={description}
                            setValue={setDescription}
                        />
                    ) : formPage == 6 ? (
                        <ProjectDescriptionPage
                            title="What materials does the project need?"
                            subtitle="Write how many and what we would need to purchase for the project. "
                            value={materials}
                            setValue={setMaterials}
                        />
                    ) : formPage == 7 ? (
                        <ProjectDescriptionPage
                            title="Project Goals"
                            subtitle="Which TLW goals does this project specifically support?"
                            value={goals}
                            setValue={setGoals}
                        >
                            <FullHackerCampLogo />
                        </ProjectDescriptionPage>
                    ) : formPage == 8 ? (
                        <div style={{ width: "40%" }}>
                            <button
                                className={styles.box}
                                style={{
                                    fontSize: 40,
                                    alignItems: "center",
                                    padding: "3%",
                                    width: "100%",
                                    backdropFilter: "blur(5px)",
                                    background: "transparent",
                                }}
                                onClick={() => {
                                    if (projectName == "") {
                                        // send them to set the project name
                                        setFormPage(0);
                                    } else {
                                        console.log({
                                            projectName: projectName,
                                            projectTypes: projectTypes,
                                            categories: categories,
                                            checkboxAnswers: checkboxAnswers,
                                            participants: participants,
                                            duration: duration,
                                            description: description,
                                            materials: materials,
                                            goals: goals,
                                        });
                                        router.push("/", { scroll: false });
                                    }
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </main>
        </div>
    );
}
