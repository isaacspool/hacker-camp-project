"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { reverseIfHebrew, translate } from "@/lib/translation";

export default function Translate({ text }) {
    const { language, _ } = useLanguageContext();
    const translatedText = reverseIfHebrew(
        text.map((section) => {
            const translated = translate(section, language);
            if (translated) return translated;
            else return section;
        }),
        language
    );
    return (
        <div className="flex-wrap tiny-gap center-all">
            {translatedText.map((text) => (
                <span style={{ textWrap: "nowrap" }} key={text}>
                    {text}
                </span>
            ))}
        </div>
    );
}
