"use client";

import Image from "next/image";
import { usePopupContext } from "./PopupProvider";

export default function LocationButton({ children, presentationMode }) {
    const { displayValue, _ } = usePopupContext();
    return (
        <div
            className={[
                "flex center left medium-gap min-width",
                presentationMode ? "" : "hover-underline",
            ].join(" ")}
        >
            <Image
                src="/icons/location.svg"
                alt="location"
                width={30}
                height={30}
            />
            <p style={{ fontSize: 24, margin: "1%" }}>
                {displayValue || children || "The Void"}
            </p>
        </div>
    );
}
