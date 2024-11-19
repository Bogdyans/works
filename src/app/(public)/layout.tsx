import Navbar from "@/app/(public)/components/navbar";


export default function Layout({
                                   children,
                               }:
                                   Readonly<{
    children: React.ReactNode;
}>
) {
    return (
        <div className="bg-gray-50 h-full">
            <Navbar />

            <main className="container mx-auto flex pt-10  justify-center">
                {children}
            </main>
        </div>
    );
}