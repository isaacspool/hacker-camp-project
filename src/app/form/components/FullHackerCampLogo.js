import Image from "next/image";

export default function FullHackerCampLogo() {
    return (
        <div style={{ width: "65%", margin: "auto" }}>
            <Image
                src="/logo/full_hacker_logo_hexagons.svg"
                width="100%"
                height="100%"
                alt="logo with hexagons"
            />
            <Image
                src="/logo/hacker_brain.png"
                width="28%"
                height="28%"
                alt="hacker brain"
                style={{
                    position: "relative",
                    left: "36%",
                    transform: "translateY(-190%)",
                }}
            />
        </div>
    );
}
