import { useLanguageContext } from "@/components/LanguageProvider";
import { useRouterRefresh } from "@/lib/hooks";
import { translate } from "@/lib/translation";
import Image from "next/image";

export default function Search({
    useTrashButton,
    handleTrashButton,
    handleClosePopup,
    setDeleted,
    setSearch,
}) {
    const { language, __ } = useLanguageContext();
    const refresh = useRouterRefresh();
    const handleDeleteElement = () => {
        handleClosePopup();
        setDeleted(true);
        const deleteStaff = async () => {
            await handleTrashButton().then(() =>
                refresh().then(() => setDeleted(false))
            );
        };
        deleteStaff();
    };

    return (
        <div className="flex center-all big-gap fill">
            <Image
                src="/icons/trash.svg"
                width="30"
                height="33"
                style={{
                    display: useTrashButton ? "flex" : "none",
                }}
                alt="trash button"
                id="trash_button"
                className="hover-scale"
                onClick={useTrashButton ? handleDeleteElement : () => {}}
            />
            <div className="rounded medium-border margin-3 big-gap flex center input-padding">
                <Image
                    src="/icons/search.svg"
                    width="30"
                    height="30"
                    alt="search"
                />
                <input
                    className="medium-text fill"
                    type="text"
                    placeholder={translate("search", language)}
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                />
            </div>
            <button>
                <Image
                    src="/icons/close.svg"
                    width="30"
                    height="30"
                    onClick={handleClosePopup}
                    className="hover-scale"
                    alt="close button"
                />
            </button>
        </div>
    );
}
