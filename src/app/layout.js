import { Lato, Noto_Serif_Hebrew } from "next/font/google";
import "@/app/global.css";
import LanguageProvider from "@/components/LanguageProvider";
import HackerBrain from "@/components/HackerBrain";

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
            <body>
                <main
                    className={[latoFont.className, hebrewFont.className].join(
                        " "
                    )}
                >
                    <HackerBrain />
                    <LanguageProvider>{children}</LanguageProvider>
                </main>
            </body>
        </html>
    );
}
