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
    presentationMode,
}) {
    const handleAddStaff = async (newStaff) => {
        "use server";
        await updateStaff({ connect: newStaff }); // false to not delete it
    };

    const locationInfo = () => (
        <div className={styles.location}>
            <img
                src="/icons/location.svg"
                alt="location"
                width={30}
                height={30}
                className={presentationMode ? "" : styles.locationButton}
            />
            <p style={{ fontSize: 24, margin: "1%" }}>
                {location ? location.name : "The Void"}
            </p>
        </div>
    );
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
                presentationMode={presentationMode}
            />
            <div className={styles.projectBody}>
                {presentationMode ? (
                    locationInfo()
                ) : (
                    <Popup
                        data={rooms}
                        clickHandler={setLocation}
                        useFilterChips={false}
                        doFlexGrow={false}
                    >
                        {locationInfo()}
                    </Popup>
                )}
                <ul className={styles.staffList}>
                    {staff.map((person) => (
                        <Person
                            icon="/icons/person.svg"
                            name={person.name}
                            staffList={staffList}
                            updateStaff={updateStaff}
                            canDelete={true}
                            canEdit={!presentationMode}
                            key={person.id}
                        />
                    ))}
                    {!presentationMode && (
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
                    )}
                </ul>
            </div>
        </div>
    );
}
