import HackerBrain from "@/components/HackerBrain";
import SelectedProjectProvider from "./components/SelectedProjectProvider";

export default function WeekLayout({ children }) {
    return (
        <section>
            <HackerBrain />
            <SelectedProjectProvider>{children}</SelectedProjectProvider>
        </section>
    );
}
