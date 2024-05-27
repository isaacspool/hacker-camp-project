import styles from "../../styles/Form.module.css";
import { translate } from "../../../pages/index.js";

export default function ParticipantsPage({
    participants,
    setParticipants,
    duration,
    setDuration,
    language,
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10%",
            }}
        >
            <h1 style={{ fontSize: 40 }}>
                {translate("form.participants", language)}
            </h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 40,
                    width: "100%",
                }}
            >
                <input
                    type="number"
                    min="4"
                    max="1000"
                    placeholder={translate("form.min", language)}
                    value={participants[0]}
                    onChange={(e) =>
                        setParticipants([e.target.value, participants[1]])
                    }
                    className={styles.textBox}
                    style={{
                        flexGrow: 0,
                        textAlign: "center",
                        width: 180,
                        borderRadius: 20,
                    }}
                />
                <p style={{ fontSize: 36 }}>{translate("form.to", language)}</p>
                <input
                    type="number"
                    min="4"
                    max="1000"
                    placeholder={translate("form.max", language)}
                    value={participants[1]}
                    onChange={(e) =>
                        setParticipants([participants[0], e.target.value])
                    }
                    className={styles.textBox}
                    style={{
                        flexGrow: 0,
                        textAlign: "center",
                        borderRadius: 20,
                    }}
                ></input>
            </div>
            <h1 style={{ fontSize: 40 }}>
                {translate("form.duration", language)}
            </h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 40,
                    width: "100%",
                }}
            >
                <input
                    type="number"
                    min="0.5"
                    max="21"
                    className={styles.textBox}
                    placeholder="..."
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{
                        flexGrow: 0,
                        width: 70,
                        textAlign: "center",
                        borderRadius: 20,
                    }}
                ></input>
                <p style={{ fontSize: 36 }}>
                    {duration == 1
                        ? translate("form.day", language)
                        : translate("form.days", language)}
                </p>
            </div>
        </div>
    );
}
