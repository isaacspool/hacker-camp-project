"use client";

import styles from "@/styles/Home.module.css";
import { useRouter } from "next/navigation";
import { useSelectedProjectContext } from "./SelectedProjectProvider";

export default function AddStaffButton({ handleAddStaff }) {
    return (
        <img
            src="/icons/add.svg"
            width="50"
            height="50"
            className={styles.addButton}
            onClick={async () => {
                setSelectedProject(null);
                await handleAddStaff().then((_) => router.refresh());
            }}
        />
    );
}
