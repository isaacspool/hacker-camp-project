import styles from "../../styles/Form.module.css";
import { Checkbox } from "../Checkbox";

export function LocationPage({ value, setValue }) {
    return (
        <div className={styles.locationPage}>
            {value.map((checkboxGroup, i) => (
                <div className={styles.box}>
                    {Object.entries(checkboxGroup).map(
                        ([checkbox, checked]) => (
                            <Checkbox
                                checked={checked}
                                setChecked={() => {
                                    const checkboxes = [...value];
                                    value[i][checkbox] =
                                        !checkboxGroup[checkbox];
                                    setValue(checkboxes);
                                }}
                            >
                                {checkbox}
                            </Checkbox>
                        )
                    )}
                </div>
            ))}
        </div>
    );
}
