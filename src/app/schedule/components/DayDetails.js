// "use client";

import prisma from "@/lib/prisma";
import styles from "@/styles/Home.module.css";
import Person from "./Person";

export default function DayDetails({
    databaseId,
    satelliteStaff,
    rundownStaff,
    staffList,
}) {
    // const [satellites, setSatellites] = useState(satelliteStaff);
    // const [rundown, setRundown] = useState(rundownStaff);

    // useEffect(() => {
    //     setSatellites(satelliteStaff);
    // }, [satelliteStaff]);

    // useEffect(() => {
    //     setRundown(rundownStaff);
    // }, [rundownStaff]);

    return (
        <>
            <div className={styles.detailsList}>
                {satelliteStaff.map((s, i) => (
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
                        key={i}
                    />
                ))}
            </div>
            <div className={styles.detailsList}>
                {rundownStaff.map((s, i) => (
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
                        key={i}
                    />
                ))}
            </div>
        </>
    );
}
