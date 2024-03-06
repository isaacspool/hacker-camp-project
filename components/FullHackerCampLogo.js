export function FullHackerCampLogo() {
    return (
        <div style={{ width: "65%" }}>
            <img
                src="/full_hacker_logo_hexagons.svg"
                width="100%"
                height="100%"
                style={{ objectFit: "contain", position: "relative", top: 0 }}
            />
            <img
                src="/hacker_brain.png"
                width="28%"
                height="28%"
                style={{
                    objectFit: "contain",
                    position: "relative",
                    top: "-65%",
                    left: "36%",
                }}
            />
        </div>
    );
}
