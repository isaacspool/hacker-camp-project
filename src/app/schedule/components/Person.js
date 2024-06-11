import PersonButton from "./PersonButton";
import PersonSelectPopup from "./popup/PersonSelectPopup";
import PopupProvider from "./popup/PopupProvider";

export default function Person({
    name,
    icon,
    updateStaff,
    staffList,
    canDelete,
    canEdit,
    staffOut,
    staffInProjects,
    handleModifyStaffOut,
    year,
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

    return canEdit ? (
        <PopupProvider initValue={name}>
            <PersonSelectPopup
                data={staffList}
                handleSelectPerson={swapStaff}
                handleTrashButton={
                    canDelete ? deleteStaff.bind(null, { name: name }) : null
                }
                doFlexGrow
                staffOut={staffOut}
                staffInProjects={staffInProjects}
                year={year}
                handleModifyStaffOut={handleModifyStaffOut}
            >
                <PersonButton
                    icon={icon}
                    canDelete={canDelete}
                    canEdit={canEdit}
                />
            </PersonSelectPopup>
        </PopupProvider>
    ) : (
        <div className="flex grow center-all">
            <PersonButton icon={icon} canDelete={canDelete} canEdit={canEdit}>
                {name}
            </PersonButton>
        </div>
    );
}
