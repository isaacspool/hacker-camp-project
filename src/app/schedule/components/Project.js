import Person from "./Person";
import ProjectTitle from "./ProjectTitle";
import LocationButton from "./LocationButton";
import PopupProvider from "./PopupProvider";
import Popup from "./Popup";
import ProjectBackground from "./ProjectBackground";
import TempStaffProvider from "./TempStaffProvider";
import Image from "next/image";

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
    staffOut,
    staffInProjects,
    dayInfo,
    handleModifyStaffOut,
}) {
    const handleAddStaff = async (newStaff) => {
        "use server";
        await updateStaff({ connect: { id: newStaff.id } });
    };

    return (
        <ProjectBackground types={types}>
            <ProjectTitle
                uniqueId={scheduledProjectId}
                databaseId={databaseId}
                projectName={projectName}
                handleDeletion={handleDeletion}
                setProjectName={setProjectName}
                presentationMode={presentationMode}
            />
            <div className="thick-border-top flex-cols big-gap-px padding-3 fill">
                {presentationMode ? (
                    <LocationButton presentationMode>
                        {location?.name}
                    </LocationButton>
                ) : (
                    <PopupProvider
                        data={rooms}
                        clickHandler={setLocation}
                        useFilterChips={false}
                        doFlexGrow={false}
                        initValue={location?.name}
                    >
                        <LocationButton />
                    </PopupProvider>
                )}
                <div className="flex-wrap">
                    {staff.map((person) => (
                        <Person
                            icon="/icons/person.svg"
                            name={person.name}
                            staffList={staffList}
                            updateStaff={updateStaff}
                            canDelete={true}
                            canEdit={!presentationMode}
                            staffOut={staffOut}
                            staffInProjects={staffInProjects}
                            year={dayInfo.year}
                            key={person.id}
                            handleModifyStaffOut={handleModifyStaffOut}
                        />
                    ))}
                    {!presentationMode && (
                        <TempStaffProvider>
                            {staff.length == 0 && (
                                <Image
                                    src="/icons/person.svg"
                                    width="25"
                                    height="25"
                                    style={{ margin: "0.3rem" }}
                                    key="img"
                                    alt="person icon"
                                />
                            )}
                            <Popup
                                addTempStaff={true}
                                data={staffList}
                                clickHandler={handleAddStaff}
                                useFilterChips={true}
                                doFlexGrow={false}
                                staffOut={staffOut}
                                staffInProjects={staffInProjects}
                                year={dayInfo.year}
                                handleModifyStaffOut={handleModifyStaffOut}
                                key="popup"
                            >
                                <Image
                                    src="/icons/add.svg"
                                    width="50"
                                    height="50"
                                    className="hover-rotate hover-opaque hover-scale"
                                    alt="add button"
                                />
                            </Popup>
                        </TempStaffProvider>
                    )}
                </div>
            </div>
        </ProjectBackground>
    );
}
