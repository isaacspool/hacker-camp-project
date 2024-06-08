import { translate } from "@/lib/translation";

export default function ParticipantsPage({
    participants,
    setParticipants,
    duration,
    setDuration,
    language,
}) {
    return (
        <div className="flex-cols center-all big-gap-px">
            <h1 className="huge-text">
                {translate("form.participants", language)}
            </h1>
            <div className="flex center-all big-gap-px fill">
                <input
                    type="number"
                    min="4"
                    max="1000"
                    placeholder={translate("minimum", language)}
                    value={participants[0]}
                    onChange={(e) =>
                        setParticipants([e.target.value, participants[1]])
                    }
                    className="medium-border rounded padding-4 large-text width-100 blur lato center-text transparent"
                />
                <p className="huge-text">{translate("form.to", language)}</p>
                <input
                    type="number"
                    min="4"
                    max="1000"
                    placeholder={translate("maximum", language)}
                    value={participants[1]}
                    onChange={(e) =>
                        setParticipants([participants[0], e.target.value])
                    }
                    className="medium-border rounded padding-4 large-text blur lato center-text width-100 transparent"
                ></input>
            </div>
            <h1 className="huge-text">
                {translate("form.duration", language)}
            </h1>
            <div className="flex center-all big-gap-px fill">
                <input
                    type="number"
                    min="0.5"
                    max="21"
                    className="medium-border rounded padding-4 large-text blur lato center-text width-100 transparent"
                    placeholder="..."
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                ></input>
                <p className="huge-text">
                    {(duration == 1
                        ? translate("form.day", language)
                        : translate("form.days", language)
                    ).toLowerCase()}
                </p>
            </div>
        </div>
    );
}
