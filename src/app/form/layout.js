import FormPageProvider from "./components/FormPageProvider";

export const metadata = {
    title: "Project Form",
};

export default function FormLayout({ children }) {
    return (
        <section>
            <FormPageProvider>{children}</FormPageProvider>
        </section>
    );
}
