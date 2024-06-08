import Link from "next/link";

export default function InfoIcon({ scale, url }) {
    return (
        <Link href={url} target="_blank">
            <img
                src="/icons/info.svg"
                width={scale}
                height={scale}
                className={"hover-scale spin-animation"}
            />
        </Link>
    );
}
