import prisma from "@/lib/prisma";
import styles from "@/styles/Home.module.css";
import Person from "./Person";

export default function DayDetails({
    databaseId,
    satelliteStaff,
    rundownStaff,
    staffList,
    isCurrentYear,
    staffOut,
    staffInProjects,
    year,
    handleModifyStaffOut,
}) {
    return (
        <div className={styles.detailsList}>
            {satelliteStaff
                .filter((s) => isCurrentYear || s.name)
                .map((s, i) => (
                    <Person
                        name={s.name ? s.name : "Satellite"}
                        icon="/icons/satellite.svg"
                        updateStaff={async (edits) => {
                            "use server";
                            await prisma.day.update({
                                where: { id: databaseId },
                                data: {
                                    satellites: edits,
                                },
                            });
                        }}
                        staffList={staffList}
                        canDelete={false}
                        canEdit={isCurrentYear}
                        staffOut={staffOut}
                        staffInProjects={staffInProjects}
                        year={year}
                        handleModifyStaffOut={handleModifyStaffOut}
                        backgroundStyle="
                        linear-gradient(
                            125deg,
                            rgba(48, 71, 140, 0.5) 0%,
                            rgba(96, 128, 191, 0.5) 50%,
                            rgba(7, 34, 72, 0.5) 92%,
                            rgba(13, 13, 13, 0.5) 100%
                        )"
                        key={s.id + "_satellite"}
                    />
                ))}
            {rundownStaff
                .filter((s) => isCurrentYear || s.name)
                .map((s) => (
                    <Person
                        name={s.name ? s.name : "Rundown"}
                        icon="/icons/rundown.svg"
                        updateStaff={async (edits) => {
                            "use server";
                            await prisma.day.update({
                                where: { id: databaseId },
                                data: {
                                    rundown: edits,
                                },
                            });
                        }}
                        staffList={staffList}
                        canDelete={false}
                        canEdit={isCurrentYear}
                        staffOut={staffOut}
                        staffInProjects={staffInProjects}
                        year={year}
                        handleModifyStaffOut={handleModifyStaffOut}
                        backgroundStyle="linear-gradient(355deg, rgba(234,159,96,0.4) 15%, rgba(217,120,85,0.4) 50%, rgba(217,78,65,0.4) 100%)"
                        key={s.id + "_rundown"}
                    />
                ))}
        </div>
    );
}
