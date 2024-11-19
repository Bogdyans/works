import Navbar from "@/app/(public)/components/navbar";


export default function Layout({
                                   children,
                               }:
                                   Readonly<{
                                       children: React.ReactNode;
                                   }>
) {
    return (
        <div className="w-11/12 bg-[#fff] py-8 px-11 rounded-xl">
                {children}
        </div>
    );
}