export default function FullHackerCampLogo() {
    return (
        <div style={{ width: "65%", margin: "auto" }}>
            <img
                src="/logo/full_hacker_logo_hexagons.svg"
                width="100%"
                height="100%"
                alt="logo with hexagons"
            />
            <img
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
