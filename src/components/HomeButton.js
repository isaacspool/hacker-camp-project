import Link from "next/link";

export default function HomeButton({ scale }) {
    return (
        <Link href="/" className="hover-scale remove-mobile clickable">
            <img src="/icons/home.svg" width={scale} height={scale} />
        </Link>
    );
}
