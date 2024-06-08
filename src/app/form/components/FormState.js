"use client";

import { useLanguageContext } from "@/components/LanguageProvider";
import { useFormPageContext } from "./FormPageProvider";
import NamePage from "./NamePage";
import ProjectTypePage from "./ProjectTypePage";
import CategoryPage from "./CategoryPage";
import ParticipantsPage from "./ParticipantsPage";
import ProjectDescriptionPage from "./ProjectDescriptionPage";
import FullHackerCampLogo from "./FullHackerCampLogo";
import SubmitButton from "./SubmitButton";
import { useState, useLayoutEffect } from "react";
import { translate } from "@/lib/translation";

export default function FormState({ submitAction, databaseCategories }) {
    const { formPage, _ } = useFormPageContext();
    const { language, __ } = useLanguageContext();

    const [projectName, setProjectName] = useState("");
    const [projectTypes, setProjectTypes] = useState("");
    const [categories, setCategories] = useState("");
    const [participants, setParticipants] = useState(["", ""]);
    const [duration, setDuration] = useState(1);
    const [description, setDescription] = useState("");
    const [materials, setMaterials] = useState("");
    const [goals, setGoals] = useState("");

    const [triangleLocation, setTriangleLocation] = useState({ x: 0, y: 0 });
    useLayoutEffect(() => {
        setTriangleLocation({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });
    }, []);

    return (
        <div
            className="flex center-all"
            style={formPage != 2 ? { height: "100%" } : {}}
        >
            {
                [
                    <NamePage
                        value={projectName}
                        setValue={setProjectName}
                        language={language}
                    />,
                    <ProjectTypePage
                        triangleLocation={triangleLocation}
                        setTriangleLocation={setTriangleLocation}
                        setProjectTypes={setProjectTypes}
                        language={language}
                    />,

                    <CategoryPage
                        value={categories}
                        setValue={setCategories}
                        categories={databaseCategories}
                    />,
                    <ParticipantsPage
                        participants={participants}
                        setParticipants={setParticipants}
                        duration={duration}
                        setDuration={setDuration}
                        language={language}
                    />,
                    <ProjectDescriptionPage
                        title={translate("form.plan.title", language)}
                        subtitle={translate("form.plan.subtitle", language)}
                        value={description}
                        setValue={setDescription}
                    />,
                    <ProjectDescriptionPage
                        title={translate("form.materials.title", language)}
                        subtitle={translate(
                            "form.materials.subtitle",
                            language
                        )}
                        value={materials}
                        setValue={setMaterials}
                    />,
                    <ProjectDescriptionPage
                        title={translate("form.goals.title", language)}
                        subtitle={translate("form.goals.subtitle", language)}
                        value={goals}
                        setValue={setGoals}
                    >
                        <FullHackerCampLogo />
                    </ProjectDescriptionPage>,
                    <SubmitButton
                        language={language}
                        formAnswers={{
                            name: projectName,
                            types: projectTypes,
                            categories: categories,
                            participants: participants,
                            duration: duration,
                            description: description,
                            materials: materials,
                            goals: goals,
                        }}
                        submitAction={submitAction}
                    />,
                ][formPage]
            }
        </div>
    );
}
