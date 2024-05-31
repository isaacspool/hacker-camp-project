import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function FormButton({ scale }) {
    return (
        <Link href="/form" className={styles.openFormButton}>
            <img
                src="/icons/open_form_background.svg"
                width={20 * scale}
                height={28 * scale}
                style={{
                    top: 72,
                    right: 80,
                    position: "relative",
                }}
            />
            <div
                style={{
                    bottom: 3.55 * scale,
                    right: 9.6 * scale,
                }}
                className={styles.openFormButtonPencil}
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
