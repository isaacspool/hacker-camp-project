import styles from "@/styles/Home.module.css";
import Popup from "./Popup";

export default function Person({
    name,
    icon,
    deleteStaff,
    swapStaff,
    staffList,
    canDelete,
}) {
    return (
        <div style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <Popup
                data={staffList}
                clickHandler={swapStaff}
                handleTrashButton={
                    canDelete ? deleteStaff.bind(null, { name: name }) : null
                }
                useFilterChips={false}
                doFlexGrow={true}
            >
                <div
                    className={[
                        styles.thinBorder,
                        styles.pill,
                        styles.person,
                    ].join(" ")}
                >
                    <img src={icon} width={21} height={21} />
                    <p style={{ margin: 0, color: "black" }}>{name}</p>
                </div>
            </Popup>
        </div>
    );
}
