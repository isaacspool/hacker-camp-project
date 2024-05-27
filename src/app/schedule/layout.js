import SelectedProjectProvider from "./components/SelectedProjectProvider";

export default function WeekLayout({ children }) {
    return (
        <section>
            <SelectedProjectProvider>{children}</SelectedProjectProvider>
        </section>
    );
}
