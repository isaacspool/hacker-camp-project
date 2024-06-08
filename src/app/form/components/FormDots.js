"use client";

import { useEffect } from "react";
import { useFormPageContext } from "./FormPageProvider";

const PAGE_COUNT = 8;

export default function FormDots() {
    const { formPage, setFormPage } = useFormPageContext();
    const handleClick = (e) => {
        setFormPage(parseInt(e.target.value));
    };
    const handleKeyPress = (e) => {
        if (e.key == "Enter") {
            setFormPage((prev) => {
                if (e.shiftKey) {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        return prev;
                    }
                } else {
                    if (prev < 4) {
                        return prev + 1;
                    } else {
                        return prev;
                    }
                }
            });
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    return (
        <div className="flex-wrap center-all left-mobile medium-gap-px padding-3 half-mobile">
            {[...Array(PAGE_COUNT).keys()].map((dot) => {
                if (dot == formPage) {
                    return <div className="pill dot-30" key={dot}></div>;
                } else {
                    return (
                        <button
                            onClick={handleClick}
                            className="pill white dot-30  thick-border"
                            value={dot}
                            key={dot}
                        ></button>
                    );
                }
            })}
        </div>
    );
}
