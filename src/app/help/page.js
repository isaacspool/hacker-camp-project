import FormButton from "@/components/FormButton";
import HomeButton from "@/components/HomeButton";
import LanguageButton from "@/components/LanguageButton";
import { getBackgroundString, getColorFromType } from "@/lib/colors";
import Image from "next/image";
import Link from "next/link";
import FormPageProvider from "../form/components/FormPageProvider";
import FormDots from "../form/components/FormDots";

export default function HelpPage() {
    const typeTextSpan = (type) => (
        <span
            style={{
                color: getColorFromType(type).replace("0.25", "1.0"),
            }}
        >
            {type}
        </span>
    );
    return (
        <div className="padding-4">
            <h1>Help / FAQ</h1>
            <ul
                className="medium-text flex-cols max-height big-gap"
                style={{ listStyle: "none" }}
            >
                <li>
                    You can always click the <LanguageButton scale={20} />{" "}
                    button in the top right to switch from English to Hebrew or
                    back again. Sorry if my translations are bad, they are
                    mostly from Google. If you want to help me improve them,
                    message Isaac
                </li>
                <li>
                    Check out the{" "}
                    <Link
                        href="https://github.com/isaacspool/hacker-camp-project"
                        className="blue-link"
                    >
                        GitHub page
                    </Link>{" "}
                    to view the source code for this website!
                </li>
                <li className="medium-border rounded padding-3">
                    <Link href="/schedule/" className="blue-link">
                        Schedule Page
                    </Link>
                    <ul>
                        <li>
                            Click on the name of a project to change its name,
                            delete it, or view more information
                        </li>
                        <li>
                            After clicking the plus button to add a new project,
                            type in a new name of a project to quickly add it.
                            Click on the types such as{" "}
                            {typeTextSpan("Creative")} and{" "}
                            {typeTextSpan("Analytical")} to add those too. Check
                            out this video to see an example:
                            <div className="min-content">
                                <h1 className="margin-title center-text">
                                    Adding a new project
                                </h1>
                                <video
                                    width={1280 / 2}
                                    height={720 / 2}
                                    className="rounded"
                                    style={{
                                        width: "50vw",
                                        height: "calc(9/16 * 50vw)",
                                    }}
                                    controls
                                    preload="none"
                                >
                                    <source
                                        src="/video/create_new_project.mp4"
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </li>
                        <li>
                            Blue means {typeTextSpan("creative")}, red means{" "}
                            {typeTextSpan("analytical")}, and yellow is an{" "}
                            {typeTextSpan("engineering")} project
                        </li>
                        <li>
                            Press the enter key in any popup menu to quickly
                            select the only option remaining
                        </li>
                        <li>
                            Press the escape key in any popup menu to quickly
                            close it
                        </li>
                        <li>
                            Press the delete key in a popup menu to quickly
                            remove the staff member from a project
                        </li>
                    </ul>
                </li>
                <li className="medium-border rounded padding-3">
                    <div className="flex medium-gap">
                        Project Form
                        <div style={{ height: 30 }}>
                            <FormButton scale={1} />
                        </div>
                    </div>
                    <ul>
                        <li>
                            Click on the dots at the top of the screen to go to
                            any page in the form
                        </li>
                        <li>
                            The solid colored dot represents the page you're on
                        </li>
                        <li>Here's a fun example:</li>
                        <FormPageProvider>
                            <FormDots />
                        </FormPageProvider>
                        <li>
                            You can click anywhere in the{" "}
                            <Image
                                src="triangle/triangle_mask.svg"
                                width="20"
                                height="20"
                                alt="triangle"
                            />{" "}
                            on the second page to change the project types
                        </li>
                    </ul>
                </li>
                <li className="medium-border rounded padding-3">
                    Home Page <HomeButton scale={25} showOnMobile />
                    <ul>
                        <li>
                            You can log out on this page if you need to (such as
                            on a public computer)
                        </li>
                        <li>
                            See who you're logged in as next to the log out
                            button
                        </li>
                        <li>
                            Click on the year at the top of the page to change
                            it to any other year.{" "}
                            <Link
                                href={{
                                    pathname: "/schedule",
                                    query: { week: 1, year: 2023 },
                                }}
                                className="blue-link"
                            >
                                Week 1 of 2023
                            </Link>{" "}
                            is copied from the old spreadsheet as an example!
                        </li>
                    </ul>
                </li>
                <li className="medium-border rounded padding-3">
                    Login Page
                    <ul>
                        <li>
                            You can type in the secret code on any number of
                            devices!
                        </li>
                        <li>Make sure you use your name when you log in</li>
                        <li>
                            Don't tell anyone the secret code you used to access
                            this website: ask Shaiel or Ariel if you really need
                            to give someone else access on their device
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
