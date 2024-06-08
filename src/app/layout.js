import { Lato, Noto_Serif_Hebrew } from "next/font/google";
import "@/app/global.css";
import LanguageProvider from "@/components/LanguageProvider";
import Link from "next/link";
import FormButton from "@/components/FormButton";
import LanguageButton from "@/components/LanguageButton";
import HomeButton from "@/components/HomeButton";
import HelpButton from "@/components/HelpButton";

const latoFont = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"],
});

const hebrewFont = Noto_Serif_Hebrew({
    subsets: ["hebrew"],
});

export const metadata = {
    title: "Hacker Schedule",
    description: "The schedule for The Learning Works Jerusalem Hacker Camp",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="black-scroll">
                <LanguageProvider>
                    <nav
                        className="fixed top-right flex-end small-gap fill no-clicks"
                        style={{ zIndex: 500 }}
                    >
                        <HelpButton />
                        <FormButton scale={1.5} />
                        <LanguageButton scale={40} />
                        <HomeButton scale={40} />
                    </nav>
                    <main
                        className={[
                            latoFont.className,
                            hebrewFont.className,
                        ].join(" ")}
                    >
                        {children}
                    </main>
                </LanguageProvider>
            </body>
        </html>
    );
}
