import Person from "../Person";
import ProjectTitle from "./ProjectTitle";
import LocationButton from "./LocationButton";
import PopupProvider from "../popup/PopupProvider";
import Popup from "../popup/Popup";
import ProjectBackground from "./ProjectBackground";
import TempStaffProvider from "../TempStaffProvider";
import Image from "next/image";
import PersonSelectPopup from "../popup/PersonSelectPopup";
import PersonIcon from "./PersonIcon";
import LocationPopup from "../popup/LocationPopup";

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
                    <PopupProvider initValue={location?.name}>
                        <LocationPopup rooms={rooms} setLocation={setLocation}>
                            <LocationButton />
                        </LocationPopup>
                    </PopupProvider>
                )}
                <div className="flex-wrap center">
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
                        <TempStaffProvider staffInProject={staff}>
                            <PersonSelectPopup
                                doFlexGrow={false}
                                data={staffList}
                                handleSelectPerson={handleAddStaff}
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
                            </PersonSelectPopup>
                        </TempStaffProvider>
                    )}
                </div>
            </div>
        </ProjectBackground>
    );
}
