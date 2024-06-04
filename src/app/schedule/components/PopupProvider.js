"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Popup from "./Popup";

const PopupContext = createContext({});
export const usePopupContext = () => useContext(PopupContext);

export default function PopupProvider(props) {
    const [displayValue, setDisplayValue] = useState(props.initValue);
    useEffect(() => {
        setDisplayValue(props.initValue);
    }, [props.initValue]);
    return (
        <PopupContext.Provider value={{ displayValue, setDisplayValue }}>
            <Popup {...props}>{props.children}</Popup>
        </PopupContext.Provider>
    );
}
