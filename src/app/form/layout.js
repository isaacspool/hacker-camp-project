import FormPageProvider from "./components/FormPageProvider";

export const metadata = {
    title: "Project Form",
};

export default function FormLayout({ children }) {
    return (
        <section>
            <HackerBrain />
            <FormPageProvider>{children}</FormPageProvider>
        </section>
    );
}
