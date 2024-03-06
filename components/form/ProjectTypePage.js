import styles from "../../styles/Form.module.css";
import { useState } from "react";
import { useEffect } from "react";

const engineering = "engineering";
const analytical = "analytical";
const creative = "creative";

function getDistance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

export function ProjectTypePage({
    triangleLocation,
    setTriangleLocation,
    setProjectTypes,
    language,
}) {
    const getPointsOfInterest = (triangle) => {
        if (!triangle) return [];
        const height = triangle.height - 35;
        const width = triangle.width;
        return [
            {
                x: width / 10,
                y: (height * 49) / 50,
                types: [analytical],
            },
            {
                x: (width * 9) / 10,
                y: (height * 49) / 50,
                types: [engineering],
            },
            {
                x: width / 2,
                y: (height * 3) / 50,
                types: [creative],
            },
            {
                x: width / 2,
                y: height / 2,
                types: [creative, analytical, engineering],
            },
            {
                x: width / 2,
                y: (height * 49) / 50,
                types: [analytical, engineering],
            },
            {
                x: (width * 15.5) / 50,
                y: height / 2,
                types: [creative, analytical],
            },
            {
                x: (width * 34.5) / 50,
                y: height / 2,
                types: [creative, engineering],
            },
        ];
    };
    const roundedTriangle = () => document.getElementById("roundedTriangle");
    const handleTriangleClick = (e) => {
        // Handle events where user clicks anywhere on the page
        const triangle = e.target;
        // y = mx + b
        // x = (y - b) / m
        // x = y / 1.1547
        if (
            e &&
            triangle &&
            triangle.tagName === "IMG" &&
            triangle.classList.contains(styles.roundedTriangle) // &&
            // e.clientX < (e.clientY + triangle.height) * 0.865 &&
            // e.clientX > (e.clientY - triangle.height) * -0.86602
        ) {
            const client = { x: e.clientX, y: e.clientY };
            let closestPoint = null;
            let closestDistance = 10000;
            const pointsOfInterest = getPointsOfInterest(triangle);
            const newLocation = (point) => {
                return {
                    x: point.x - triangle.width / 2 + window.innerWidth / 2,
                    y:
                        point.y -
                        (triangle.height - 35) / 2 +
                        window.innerHeight / 2,
                };
            };
            for (let i in pointsOfInterest) {
                const point = pointsOfInterest[i];
                const distance = getDistance(client, newLocation(point));
                if (!closestPoint || distance < closestDistance) {
                    closestPoint = point;
                    closestDistance = distance;
                }
            }
            if (closestPoint) {
                setProjectTypes(closestPoint.types);
                setTriangleLocation(newLocation(closestPoint));
            }
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleTriangleClick);
        return () => {
            document.removeEventListener("click", handleTriangleClick);
        };
    }, []);
    return (
        <div>
            <p
                className={[
                    styles.triangleText,
                    styles.notoSerifHebrew200,
                ].join(" ")}
                style={{
                    left: "50%",
                    top: "calc(50% - var(--triangle-height) / 2 - 90px)",
                }}
            >
                {language === "hebrew" ? "יצירתי" : "Creative"}
            </p>
            <p className={styles.triangleText} style={{ left: "72%" }}>
                {language === "hebrew" ? "הנדסאי" : "Engineering"}
            </p>
            <p className={styles.triangleText} style={{ left: "27%" }}>
                {language === "hebrew" ? "אנליטי" : "Analytical"}
            </p>
            <div
                className={styles.emptyDot}
                style={{
                    position: "fixed",
                    left: triangleLocation.x - 15,
                    top: triangleLocation.y - 15,
                    zIndex: 100,
                    background: "transparent",
                    pointerEvents: "none",
                }}
            ></div>
            <img
                src="/rounded_triangle.svg"
                width="410"
                height="345"
                className={styles.roundedTriangle}
                id="roundedTriangle"
            />
            <div
                className={styles.triangle}
                style={{
                    background:
                        "linear-gradient(300deg, rgba(251, 170, 11, 1) 0%, rgba(255, 255, 255, 1) 53%)",
                }}
            ></div>
            <div
                className={styles.triangle}
                style={{
                    background:
                        "linear-gradient(60deg, rgba(220,63,63,1) 0%, rgba(255,255,255,0) 53%)",
                }}
            ></div>
            <div
                className={styles.triangle}
                style={{
                    background:
                        "linear-gradient(180deg, rgba(43,73,231,1) 0%, rgba(255,255,255,0) 65%)",
                }}
            />
            {/* <div>
                {getPointsOfInterest(roundedTriangle()).map((point, i) => (
                    <div
                        className={styles.emptyDot}
                        style={{
                            position: "absolute",
                            left:
                                point.x -
                                15 -
                                roundedTriangle().width / 2 +
                                window.innerWidth / 2,
                            top:
                                point.y -
                                15 -
                                (roundedTriangle().height - 35) / 2 +
                                window.innerHeight / 2,
                            border: "5px solid red",
                            zIndex: 2,
                            background: "transparent",
                            pointerEvents: "none",
                        }}
                        key={i}
                    ></div>
                ))}
            </div> */}
        </div>
    );
}
