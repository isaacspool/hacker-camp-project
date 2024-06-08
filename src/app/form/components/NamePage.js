import { translate } from "@/lib/translation";

export default function NamePage({ value, setValue, language }) {
    return (
        <input
            type="text"
            placeholder={translate("form.project_name", language)}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="thick-border fill blur huge-text rounded-30 input-padding"
        />
    );
}
