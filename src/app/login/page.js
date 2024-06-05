import prisma from "@/lib/prisma";
import LoginInput from "./components/LoginInput";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import HackerBrain from "@/components/HackerBrain";

const NOT_STAFF_MSG =
    '"%s" isn\'t a Hacker Camp staff member. Tell someone to add your name to the database.';

export default async function LoginPage() {
    const hackerStaff = await prisma.staff.findMany({ select: { name: true } });
    const handleLogin = async (previousState, formData) => {
        "use server";

        const name = formData.get("name");
        if (typeof name != "string") {
            return { message: NOT_STAFF_MSG.replace("%s", "N/A") };
        }
        let staff = null;
        for (const s of hackerStaff) {
            if (s.name.toLowerCase() == name.toLowerCase()) {
                staff = s.name;
            }
        }
        if (!staff) {
            return {
                message: NOT_STAFF_MSG.replace("%s", name),
            };
        }

        const secret = formData.get("secret");
        if (typeof secret != "string") {
            return { message: "Secret must be text" };
        }
        if (secret != process.env.LOGIN_SECRET) {
            return { message: "That isn't the correct secret code!" };
        }
        const fourMonths = 3 * 30.5 * 24 * 60 * 60 * 1000;
        cookies().set("name", staff);
        cookies().set("secret", secret, {
            secure: true,
            expires: Date.now() + fourMonths,
        });
        redirect("/");
        return { message: "Login success" };
    };

    const secret = cookies().get("secret");
    if (secret) {
        if (process.env.LOGIN_SECRET == secret.value) {
            // redirect("/");
        }
    }
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                The Learning Works Hacker Camp
            </h1>
            <LoginInput handleLogin={handleLogin} />
            <HackerBrain />
        </div>
    );
}
