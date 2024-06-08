import Image from "next/image";
import Link from "next/link";

export default function DayViewButton(props) {
    return (
        <Link
            href={{ pathname: "/schedule", query: props }}
            target="_blank"
            className="flex"
        >
            <Image
                src="/icons/new_window.svg"
                height="30"
                width="30"
                alt="day view button"
            />
        </Link>
    );
}
