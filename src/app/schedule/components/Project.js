import styles from "@/styles/Home.module.css";
import Person from "./Person";
import Popup from "./Popup";
import AddStaffButton from "./AddStaffButton";
import { getBackgroundString } from "@/lib/colors";
import ProjectTitle from "./ProjectTitle";

export default function Project({
    staff,
    updateStaff,
    location,
    setLocation,
    databaseId,
    scheduledProjectId,
    projectName,
    setProjectName,
    handleDeletion,
    types,
    rooms,
    staffList,
}) {
    const handleAddStaff = async (newStaff) => {
        "use server";
        await updateStaff({ connect: newStaff }); // false to not delete it
    };

    const handleDeleteStaff = async (oldStaff) => {
        "use server";
        await updateStaff({ disconnect: oldStaff });
    };

    const handleSwapStaff = async (newStaff) => {
        "use server";
        await updateStaff({ connect: newStaff, disconnect: { name: name } });
    };

    return (
        <div
            className={[styles.border, styles.project].join(" ")}
            style={
                types && {
                    background: getBackgroundString(types, "180deg"),
                }
            }
        >
            <ProjectTitle
                uniqueId={scheduledProjectId}
                databaseId={databaseId}
                projectName={projectName}
                handleDeletion={handleDeletion}
                setProjectName={setProjectName}
            />
            <div className={styles.projectBody}>
                <Popup
                    data={rooms}
                    clickHandler={setLocation}
                    useFilterChips={false}
                    doFlexGrow={false}
                >
                    <div className={styles.location}>
                        <img
                            src="/icons/location.svg"
                            alt="location"
                            width={30}
                            height={30}
                            className={styles.locationButton}
                        />
                        <p style={{ fontSize: 24, margin: "1%" }}>
                            {location ? location.name : "The Void"}
                        </p>
                    </div>
                </Popup>
                <ul className={styles.staffList}>
                    {staff.map((person, i) => (
                        <Person
                            icon="/icons/person.svg"
                            name={person.name}
                            staffList={staffList}
                            swapStaff={handleSwapStaff}
                            deleteStaff={handleDeleteStaff}
                            canDelete={true}
                            key={person.id}
                        />
                    ))}
                    <Popup
                        data={staffList}
                        clickHandler={handleAddStaff}
                        useFilterChips={false}
                        doFlexGrow={false}
                    >
                        <img
                            src="/icons/add.svg"
                            width="50"
                            height="50"
                            className={styles.addButton}
                        />
                    </Popup>
                </ul>
            </div>
        </div>
    );
}
