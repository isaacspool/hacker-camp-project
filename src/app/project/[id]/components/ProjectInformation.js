import Translate from "./Translate";

export default function ProjectInformation({
    children,
    title,
    doNotTranslate,
    reactKey,
}) {
    return (
        <div
            className="medium-border rounded medium-text lato grow max-width-500 margin-1 blur"
            style={children ? {} : { alignContent: "center" }}
            key={title || reactKey}
        >
            {title && (
                <div className="center-text">
                    <h1 className="large-text lato margin-title">
                        {doNotTranslate ? title : <Translate text={title} />}
                    </h1>
                    {children && <hr className="medium-border" />}
                </div>
            )}
            {children && (
                <div style={{ padding: "5%", height: "100%", width: "100%" }}>
                    {children}
                </div>
            )}
        </div>
    );
}
