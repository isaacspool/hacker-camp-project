import styles from "@/styles/Home.module.css";
import Popup from "./Popup";

export default function Person({
    name,
    icon,
    updateStaff,
    staffList,
    canDelete,
    canEdit,
    backgroundStyle,
}) {
    const deleteStaff = async (oldStaff) => {
        "use server";
        await updateStaff({ disconnect: { name: oldStaff.name } });
    };

    const swapStaff = async (newStaff) => {
        "use server";
        await updateStaff({
            connect: { id: newStaff.id },
            disconnect: { name: name },
        });
    };

    const personInfo = () => (
        <div
            className={[
                styles.thinBorder,
                styles.pill,
                styles.person,
                canEdit ? styles.personHoverable : "",
            ].join(" ")}
            // style={
            //     backgroundStyle
            //         ? { backgroundColor: backgroundStyle, border: "none" }
            //         : {}
            // }
        >
            <img src={icon} width={canDelete ? 21 : 30} height={21} />
            <p style={{ margin: 0, color: "black" }}>{name}</p>
        </div>
    );

    return (
        <div style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            {canEdit ? (
                <Popup
                    data={staffList}
                    clickHandler={swapStaff}
                    handleTrashButton={
                        canDelete
                            ? deleteStaff.bind(null, { name: name })
                            : null
                    }
                    useFilterChips={false}
                    doFlexGrow={true}
                >
                    {personInfo()}
                </Popup>
            ) : (
                personInfo()
            )}
        </div>
    );
}
