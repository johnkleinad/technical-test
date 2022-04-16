import SearchBar from "../components/SearchBar";

const MainLayout = ({ children, title }) => {
    return <>
        <section className="fixed inset-0 bg-gray-scale-10">
            <div className="sticky p-4 top-0">
                <span className="text-5xl font-semibold">{title}</span>
            </div>
            <SearchBar />
            {children}
        </section>
    </>
}
export default MainLayout;