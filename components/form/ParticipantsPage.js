import styles from "../../styles/Form.module.css";
import { useState } from "react";
import { useEffect } from "react";

export function ParticipantsPage({
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
                {language == "hebrew" ? "מספר המשתתפים" : "Participants"}
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
                    placeholder="Min"
                    value={participants[0]}
                    onChange={(e) =>
                        setParticipants([e.target.value, participants[1]])
                    }
                    className={styles.textBox}
                    style={{
                        flexGrow: 0,
                        width: 70,
                        textAlign: "center",
                        borderRadius: 20,
                    }}
                ></input>
                <p style={{ fontSize: 36 }}>
                    {language == "hebrew" ? "עד" : "to"}
                </p>
                <input
                    type="number"
                    min="4"
                    max="1000"
                    placeholder="Max"
                    value={participants[1]}
                    onChange={(e) =>
                        setParticipants([participants[0], e.target.value])
                    }
                    className={styles.textBox}
                    style={{
                        flexGrow: 0,
                        width: 70,
                        textAlign: "center",
                        borderRadius: 20,
                    }}
                ></input>
            </div>
            <h1 style={{ fontSize: 40 }}>
                {language == "hebrew" ? "משך" : "Duration"}
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
                    {language == "hebrew" ? "ימים" : "days"}
                </p>
            </div>
        </div>
    );
}
