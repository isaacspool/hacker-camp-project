import { useEffect } from "react";
import { translate } from "@/lib/translation";
import Image from "next/image";

const engineering = "Engineering";
const analytical = "Analytical";
const creative = "Creative";

function getDistance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

export default function ProjectTypePage({
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
    const handleTriangleClick = (e) => {
        // Handle events where user clicks anywhere on the page
        const triangle = e.target;
        if (e && triangle && triangle.tagName === "IMG") {
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
    const triangleHeight = 345;
    const triangleWidth = 415;
    return (
        <div>
            <p
                style={{
                    position: "absolute",
                    fontSize: "3.25vmax",
                    left: "44%",
                    top: `calc(50% - ${triangleHeight}px / 2 - 70px)`,
                }}
            >
                {translate("type.creative", language)}
            </p>
            <p
                style={{
                    position: "absolute",
                    fontSize: "3.25vmax",
                    top: `calc(50% + ${triangleHeight}px / 2 + 10px)`,
                    left: "63%",
                }}
            >
                {translate("type.engineering", language)}
            </p>
            <p
                style={{
                    position: "absolute",
                    fontSize: "3.25vmax",
                    top: `calc(50% + ${triangleHeight}px / 2 + 10px)`,
                    left: "24%",
                }}
            >
                {translate("type.analytical", language)}
            </p>
            <div
                className="thick-border pill dot-30"
                style={{
                    position: "fixed",
                    left: triangleLocation.x - 15,
                    top: triangleLocation.y - 15,
                    zIndex: 100,
                    background: "transparent",
                    pointerEvents: "none",
                }}
            ></div>
            <Image
                src="/triangle/rounded_triangle.svg"
                width="410"
                height="345"
                className="fixed-center"
                alt="project types triangle"
                style={{ zIndex: 10 }}
            />
            <div
                className="fixed-center triangle-effect"
                style={{
                    width: triangleWidth,
                    height: triangleHeight,
                    background:
                        "linear-gradient(300deg, rgba(251, 170, 11, 1) 0%, rgba(255, 255, 255, 1) 53%)",
                }}
            ></div>
            <div
                className="fixed-center triangle-effect"
                style={{
                    width: triangleWidth,
                    height: triangleHeight,
                    background:
                        "linear-gradient(60deg, rgba(220,63,63,1) 0%, rgba(255,255,255,0) 53%)",
                }}
            ></div>
            <div
                className="fixed-center triangle-effect"
                style={{
                    width: triangleWidth,
                    height: triangleHeight,
                    background:
                        "linear-gradient(180deg, rgba(43,73,231,1) 0%, rgba(255,255,255,0) 65%)",
                }}
            />
        </div>
    );
}
