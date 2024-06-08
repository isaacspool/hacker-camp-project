"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { translate } from "@/lib/translation";
import Link from "next/link";

export default function DayTitle({ dayKey, dayInfo, presentationMode }) {
    const { language, _ } = useLanguageContext();
    return (
        <div className="flex-space center">
            <h1 className={"huge-text"}>{translate(dayKey, language)}</h1>
            {!presentationMode && (
                <Link
                    href={`/schedule/?week=${dayInfo.week}&year=${dayInfo.year}&day=${dayInfo.day}`}
                    target="_blank"
                    className="flex"
                >
                    <img src="/icons/new_window.svg" height="30" width="30" />
                </Link>
            )}
        </div>
    );
}
