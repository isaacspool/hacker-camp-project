"use client";

import styles from "@/styles/Home.module.css";

export default function LogoutButton({ handleLogout }) {
    return (
        <button
            onClick={async () => await handleLogout()}
            className={[styles.staff, styles.pill, styles.logoutButton].join(
                " "
            )}
        >
            Logout
        </button>
    );
}
