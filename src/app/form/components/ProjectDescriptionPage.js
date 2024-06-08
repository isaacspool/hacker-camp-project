export default function ProjectDescriptionPage({
    children,
    title,
    subtitle,
    value,
    setValue,
}) {
    let inputPart = (
        <>
            <h1 className="huge-text center-text">{title}</h1>
            <p className="large-text center-text">{subtitle}</p>
            <div className="thick-border rounded-30 padding-4 fill blur fill-height-80">
                <textarea
                    placeholder="..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className="fill overflow-y medium-text no-resize black-scroll fill-height"
                />
            </div>
        </>
    );
    if (children) {
        return (
            <div className="flex-cols-mobile small-gap fill">
                <div
                    className="flex-cols grow big-gap center padding-3 height-auto"
                    style={{ maxHeight: "80vh" }}
                >
                    {inputPart}
                </div>
                {children}
            </div>
        );
    } else {
        return (
            <div className="flex-cols grow big-gap center padding-3 fill-height-80">
                {inputPart}
            </div>
        );
    }
}
