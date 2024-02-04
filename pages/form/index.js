import { useEffect } from "react";
import styles from "../../styles/Form.module.css";
import Head from "next/head";
import { useState } from "react";

export default function Form() {
    const [formPage, setFormPage] = useState(0);
    const PAGE_COUNT = 8;
    const handleClick = (e) => {
        setFormPage(e.target.value);
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Project Form</title>
                <link rel="icon" href="/hacker_brain.png" />
            </Head>

            <main style={{ width: "100%", height: "90vh" }}>
                {/* <Link href="/form" className={styles.newProjectButton}>
                    <div className={styles.buttonBackground} />
                    <img src="/form_button.svg" />
                </Link> */}
                {/* <img
                    src="/hacker_brain.png"
                    alt="logo"
                    className={styles.bigLogo}
                    width="100%"
                    height="100%"
                /> */}
                <div className={styles.dots}>
                    {[...Array(PAGE_COUNT).keys()].map((dot, i) => {
                        if (i == formPage) {
                            return <div className={styles.filledDot}></div>;
                        } else {
                            return (
                                <button
                                    onClick={handleClick}
                                    className={styles.emptyDot}
                                    value={i}
                                ></button>
                            );
                        }
                    })}
                </div>
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {formPage == 0 ? (
                        <input
                            type="text"
                            placeholder="Project Name"
                            className={styles.thickBorder}
                            style={{
                                padding: 20,
                                fontSize: 40,
                                width: "100%",
                                fontFamily: "'Montserrat', sans-serif",
                            }}
                        ></input>
                    ) : (
                        <div></div>
                    )}
                </div>
            </main>
        </div>
    );
}
