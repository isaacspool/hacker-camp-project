import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function InfoIcon({ scale, url }) {
    return (
        <Link href={url} target="_blank">
            <img
                src="/icons/info_circle.svg"
                width={scale}
                height={scale}
                className={styles.infoIconCircle}
            />
            <img
                src="/icons/info_i.svg"
                width={scale / 10}
                height={scale / 2}
                className={styles.infoIconI}
            />
        </Link>
    );
}
