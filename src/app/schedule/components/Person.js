import PersonButton from "./PersonButton";
import PopupProvider from "./PopupProvider";

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
        <PopupProvider
            data={staffList}
            clickHandler={swapStaff}
            handleTrashButton={
                canDelete ? deleteStaff.bind(null, { name: name }) : null
            }
            useFilterChips={true}
            doFlexGrow={true}
            staffOut={staffOut}
            staffInProjects={staffInProjects}
            year={year}
            handleModifyStaffOut={handleModifyStaffOut}
            initValue={name}
        >
            <PersonButton icon={icon} canDelete={canDelete} canEdit={canEdit} />
        </PopupProvider>
    ) : (
        <div className="flex grow center-all">
            <PersonButton icon={icon} canDelete={canDelete} canEdit={canEdit}>
                {name}
            </PersonButton>
        </div>
    );
}
