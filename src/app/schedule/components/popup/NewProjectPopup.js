"use client";

import { translate } from "@/lib/translation";
import Popup from "./Popup";
import { getBackgroundString, getColorFromType } from "@/lib/colors";
import { useLanguageContext } from "@/components/LanguageProvider";
import InfoIcon from "../InfoIcon";
import { useRouter } from "next/navigation";

export default function NewProjectPopup({ children, data, clickHandler }) {
    const { language, _ } = useLanguageContext();
    const router = useRouter();
    const filterChipsProvider = () => {
        return ["Creative", "Engineering", "Analytical"].map((type) => ({
            displayName: translate(`type.${type.toLowerCase()}`, language),
            name: type,
            color: getColorFromType(type),
        }));
    };

    const itemIconProvider = (item) => {
        if (item.id) {
            return (
                <div style={{ height: 45 }}>
                    <InfoIcon scale={45} url={`/project/${item.id}`} />
                </div>
            );
        }
    };

    const warningMessageProvider = (dataRemaining) =>
        dataRemaining.length > 100 && (
            <p style={{ margin: "auto" }}>Only showing 100 results.</p>
        );

    const customItemStyle = (item) => {
        if (item.types) {
            return {
                background: getBackgroundString(item.types, "90deg"),
            };
        }
        return null;
    };

    const customItemFilter = (item, elementFilter) => {
        const hasSelectedTypes =
            elementFilter.length == 0 ||
            elementFilter.every((t) => item.types.includes(t));
        return hasSelectedTypes;
    };

    return (
        <Popup
            data={data}
            clickHandler={async (item) =>
                await clickHandler(item).then((_) => router.refresh())
            }
            filterChipsProvider={filterChipsProvider}
            doFlexGrow={false}
            itemIconProvider={itemIconProvider}
            warningMessage={warningMessageProvider}
            customItemStyle={customItemStyle}
            customItemFilter={customItemFilter}
            initElementFilter={[]}
            useSearchAsOption
        >
            {children}
        </Popup>
    );
}
