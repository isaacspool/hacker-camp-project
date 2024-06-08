import Link from "next/link";

export default function FormButton({ scale }) {
    return (
        <Link
            href="/form"
            className="hover-scale hover-form-animation clickable"
            style={{
                "--anim-scale": scale,
                height: 28 * scale,
                width: 20 * scale + 8,
            }}
        >
            <img
                src="/icons/open_form_background.svg"
                width={20 * scale}
                height={28 * scale}
            />
            <div
                style={{
                    position: "relative",
                    bottom: 23 * scale,
                    left: 10 * scale,
                }}
            >
                <img
                    src="/icons/open_form_pencil.svg"
                    width={16 * scale}
                    height={16 * scale}
                    id="pencil"
                />
            </div>
        </Link>
    );
}
