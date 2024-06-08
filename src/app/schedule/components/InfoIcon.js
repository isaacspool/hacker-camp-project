import Image from "next/image";
import Link from "next/link";
import info from "@/../public/icons/info.svg";

export default function InfoIcon({ scale, url }) {
    return (
        <Link href={url} target="_blank">
            <Image
                src={info}
                width={scale}
                height={scale}
                className={"hover-scale spin-animation"}
                alt="info"
            />
        </Link>
    );
}
