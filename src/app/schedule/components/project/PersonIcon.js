import Image from "next/image";

export default function PersonIcon({ staff, tempStaff }) {
    if (tempStaff.length != 0 || staff.length != 0) return null;
    return (
        <Image
            src="/icons/person.svg"
            width="25"
            height="25"
            style={{ margin: "0.3rem" }}
            key="img"
            alt="person icon"
        />
    );
}
