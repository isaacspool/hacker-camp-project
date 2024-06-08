"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { translate } from "@/lib/translation";
import DayViewButton from "./DayViewButton";

export default function DayTitle({ dayKey, dayInfo, presentationMode }) {
    const { language, _ } = useLanguageContext();
    return (
        <div className="flex-space center">
            <h1 className={"huge-text"}>{translate(dayKey, language)}</h1>
            {!presentationMode && (
                <DayViewButton
                    day={dayInfo.day}
                    week={dayInfo.week}
                    year={dayInfo.year}
                />
            )}
        </div>
    );
}
