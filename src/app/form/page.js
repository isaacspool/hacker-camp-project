import styles from "@/styles/Form.module.css";
import FormState from "./components/FormState";
import FormDots from "./components/FormDots";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function Form() {
    const submitAction = async (formData) => {
        "use server";
        const creator = cookies().get("name")?.value;
        let minParticipants = formData.participants[0];
        if (minParticipants) {
            minParticipants = parseInt(minParticipants);
        } else {
            minParticipants = null;
        }
        let maxParticipants = formData.participants[1];
        if (maxParticipants) {
            maxParticipants = parseInt(maxParticipants);
        } else {
            maxParticipants = null;
        }
        const duration = formData.duration ? parseFloat(formData.duration) : 1;
        const data = {
            name: formData.name,
            description: formData.description,
            materials: formData.materials,
            goals: formData.goals,
            minParticipants: minParticipants,
            maxParticipants: maxParticipants,
            duration: duration,
            creator: {
                connect: { name: creator || "Option 42" },
            },
        };
        if (formData.types) {
            data.types = formData.types;
        }
        if (formData.categories && formData.categories.length > 0) {
            data.categories = {
                connect: formData.categories.map((c) => {
                    return { id: c.id };
                }),
            };
        }
        return await prisma.project.create({ data });
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
                <FormDots />
                <FormState
                    submitAction={submitAction}
                    databaseCategories={categories}
                />
            </div>
        </div>
    );
}
