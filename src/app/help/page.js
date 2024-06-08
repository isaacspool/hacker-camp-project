import FormButton from "@/components/FormButton";
import HomeButton from "@/components/HomeButton";
import LanguageButton from "@/components/LanguageButton";
import Link from "next/link";

export default function HelpPage() {
    return (
        <div className="padding-4 grow-mobile">
            <h1>
                I'm still working on this help page. For now, if this list
                doesn't answer your question, ask Isaac on WhatsApp if you have
                any questions.
            </h1>
            <ul className="medium-text">
                <li>
                    You can always click the <LanguageButton scale={20} />{" "}
                    button in the top right to switch from English to Hebrew or
                    back again. Sorry if my translations are bad, they are
                    mostly from Google
                </li>
                <li>
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
                            Click on the types such as Creative and Analytical
                            to add those too. Check out this video to see an
                            example (not visible on your phone)
                            <video
                                width={1280 / 2}
                                height={720 / 2}
                                className="hide-mobile"
                                style={{
                                    position: "absolute",
                                    top: 500,
                                    left: "70%",
                                    transform:
                                        "translateX(-50%) translateY(-50%)",
                                }}
                                controls
                                preload="none"
                            >
                                <source
                                    src="/videos/create_new_project.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        </li>
                        <li>
                            Blue means creative, red is analytical, and yellow
                            is engineering
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
                            Press the delete key in a popup menu with a delete
                            button to quickly delete it
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="flex medium-gap">
                        Project Form
                        <div>
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
                        <li>
                            You can click anywhere in the triangle on the second
                            page to change the project types
                        </li>
                    </ul>
                </li>
                <li>
                    Home Page <HomeButton scale={25} />
                    <ul>
                        <li>
                            You can log out on this page if you need to (such as
                            on a public computer)
                        </li>
                        <li>
                            Click on the year at the top of the page to change
                            it to any other year. Week 1 of 2023 is copied from
                            the old spreadsheet as an example!
                        </li>
                    </ul>
                </li>
                <li>
                    Login Page
                    <ul>
                        <li>
                            You can type in the secret code on any number of
                            devices!
                        </li>
                        <li>Make sure you use your name when you log in</li>
                        <li>
                            Don't tell anyone the secret code to access this
                            website, first ask Shaiel or Ariel if you really
                            need to give someone else access to it
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
