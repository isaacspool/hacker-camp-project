"use client";

import Popup from "./Popup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePopupContext } from "./PopupProvider";
import { useTempStaffContext } from "../TempStaffProvider";
import { useRouterRefresh } from "@/lib/hooks";

export default function PersonSelectPopup({
    children,
    data,
    handleSelectPerson,
    handleTrashButton,
    staffOut,
    staffInProjects,
    year,
    handleModifyStaffOut,
    doFlexGrow,
}) {
    const router = useRouter();
    const { _, setDisplayValue } = usePopupContext();
    const { tempStaff, setTempStaff } = useTempStaffContext();
    const refresh = useRouterRefresh();

    const filterChipsProvider = () => {
        return [
            ["Out", "#d14c3b6b"],
            ["Unassigned", "#f7cd6a6b"],
            ["Assigned", "#79d1606b"],
        ].map((chip) => ({
            displayName: chip[0],
            name: chip[0],
            color: chip[1],
        }));
    };

    const itemIconProvider = (item) => {
        const notInProject =
            !staffInProjects.find((s) => s.name == item.name) &&
            item.years.includes(year);
        const isNotHere = staffOut.find((s) => s.name == item.name);
        if (notInProject) {
            if (isNotHere) {
                return (
                    <Image
                        src="/icons/add.svg"
                        width="47"
                        height="47"
                        alt="add button"
                        onClick={async () =>
                            await handleModifyStaffOut({
                                disconnect: {
                                    name: item.name,
                                },
                            }).then((_) => router.refresh())
                        }
                    />
                );
            } else {
                return (
                    <Image
                        src="/icons/close.svg"
                        width="25"
                        height="25"
                        alt="close button"
                        onClick={async () =>
                            await handleModifyStaffOut({
                                connect: {
                                    name: item.name,
                                },
                            }).then((_) => router.refresh())
                        }
                    />
                );
            }
        }
    };

    const customItemFilter = (item, elementFilter) => {
        const isStaffOut =
            !elementFilter.find((e) => e == "Out") ||
            staffOut.find((s) => s.name == item.name);
        const isStaffInProject =
            !elementFilter.find((e) => e == "Assigned") ||
            staffInProjects.find((e) => e.name == item.name);
        const isStaffUnassigned =
            !elementFilter.find((e) => e == "Unassigned") ||
            (item.years.includes(year) &&
                !staffInProjects?.find((e) => e.name == item.name) &&
                !staffOut?.find((e) => e.name == item.name));
        return isStaffOut && isStaffInProject && isStaffUnassigned;
    };

    const clickHandler = async (item) => {
        if (setDisplayValue) setDisplayValue(item.name);
        if (tempStaff) setTempStaff([...tempStaff, item.name]);

        await handleSelectPerson(item).then(() =>
            refresh().then(() => {
                if (tempStaff) setTempStaff([]);
            })
        );
    };

    return (
        <Popup
            useSearchAsOption
            doFlexGrow={doFlexGrow}
            data={data}
            clickHandler={clickHandler}
            filterChipsProvider={filterChipsProvider}
            itemIconProvider={itemIconProvider}
            initElementFilter={["Unassigned"]}
            handleTrashButton={handleTrashButton}
            handleModifyStaffOut={handleModifyStaffOut}
            customItemFilter={customItemFilter}
        >
            {children}
        </Popup>
    );
}
