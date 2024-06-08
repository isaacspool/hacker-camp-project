import Image from "next/image";
import Link from "next/link";

export default function HelpButton() {
    return (
        <Link href="/help" className="hover-scale spin-animation clickable">
            <Image alt="help" src="/icons/help.svg" width="40" height="40" />
        </Link>
    );
}
