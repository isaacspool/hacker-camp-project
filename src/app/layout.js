import { Lato, Noto_Serif_Hebrew } from "next/font/google";
import "@/app/global.css";
import LanguageProvider from "@/components/LanguageProvider";
import Link from "next/link";
import FormButton from "@/components/FormButton";
import LanguageButton from "@/components/LanguageButton";

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
                        <Link
                            href="/help"
                            className="hover-scale spin-animation clickable"
                        >
                            <img src="/icons/help.svg" width="40" height="40" />
                        </Link>
                        <FormButton scale={1.5} />
                        <LanguageButton />
                        <Link
                            href="/"
                            className="hover-scale remove-mobile clickable"
                        >
                            <img src="/icons/home.svg" width="40" height="40" />
                        </Link>
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
