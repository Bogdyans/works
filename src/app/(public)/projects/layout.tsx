import Navbar from "@/app/(public)/components/navbar";


export default function Layout({
                                   children,
                               }:
                                   Readonly<{
                                       children: React.ReactNode;
                                   }>
) {
    return (
        <div className="w-11/12 bg-[#fff] p-9 rounded-xl shadow-md border-gray-100 font-sans">
                {children}
        </div>
    );
}