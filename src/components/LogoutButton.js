"use client";

export default function LogoutButton({ handleLogout, loggedInUser }) {
    return (
        <button
            onClick={async () => await handleLogout()}
            className="padding-1 medium-text pill input-padding fixed top-left thick-border hover-darken"
        >
            Logout{loggedInUser ? ` (${loggedInUser})` : ""}
        </button>
    );
}
