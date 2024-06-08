import Image from "next/image";
import Link from "next/link";

export default function HomeButton({ scale, showOnMobile }) {
    return (
        <Link
            href="/"
            className={`hover-scale ${
                showOnMobile ? "" : "remove-mobile"
            } clickable`}
        >
            <Image
                src="/icons/home.svg"
                width={scale}
                height={scale}
                alt="home button"
            />
        </Link>
    );
}
