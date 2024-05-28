import styles from "@/styles/Form.module.css";
import Link from "next/link";
import FormState from "./components/FormState";
import FormDots from "./components/FormDots";
import prisma from "@/lib/prisma";

export default async function Form() {
    const submitAction = async (formData) => {
        "use server";
        await prisma.project.create({
            data: {
                name: formData.name,
                types: formData.types,
                description: formData.description,
                materials: formData.materials,
                goals: formData.goals,
                minParticipants: formData.participants[0]
                    ? parseInt(formData.participants[0])
                    : 4,
                maxParticipants: formData.participants[1]
                    ? parseInt(formData.participants[1])
                    : 16,
                duration: formData.duration ? parseFloat(formData.duration) : 1,
                // categories: {
                //     connect: formData.categories.map((c) => {
                //         return { id: c.id };
                //     }),
                // },
            },
        });
    };

    const categories = await prisma.category.findMany();

    return (
        <div className={styles.container}>
            <svg
                style={{ visibility: "hidden", position: "absolute" }}
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="8"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>
            <div
                className={styles.main}
                style={{ width: "100%", height: "90vh" }}
            >
                <img
                    src="/logo/hacker_brain.png"
                    alt="logo"
                    className={styles.bigLogo}
                    width="92%"
                    height="92%"
                />
                <Link href="/" className={styles.backButton}>
                    <img src="/icons/back.svg" />
                </Link>
                <FormDots />
                <FormState
                    submitAction={submitAction}
                    databaseCategories={categories}
                />
            </div>
        </div>
    );
}
