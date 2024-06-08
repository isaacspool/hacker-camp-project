import hebrewTranslation from "@/../public/lang/he-il.json";
import englishTranslation from "@/../public/lang/en-us.json";

export function translate(key, language) {
    return language === "he" ? hebrewTranslation[key] : englishTranslation[key];
}

export function reverseIfHebrew(texts, language) {
    if (language === "he") return texts.reverse();
    else return texts;
}
