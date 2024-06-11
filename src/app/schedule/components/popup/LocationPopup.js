"use client";

import { useRouter } from "next/navigation";
import Popup from "./Popup";
import { usePopupContext } from "./PopupProvider";

export default function LocationPopup({ children, rooms, setLocation }) {
    const router = useRouter();
    const { _, setDisplayValue } = usePopupContext();
    const clickHandler = async (item) => {
        setDisplayValue(item.name);

        await setLocation(item).then(() => router.refresh());
    };
    return (
        <Popup data={rooms} clickHandler={clickHandler} doFlexGrow={false}>
            {children}
        </Popup>
    );
}
