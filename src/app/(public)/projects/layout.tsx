import BreadCrumbs from "@/app/(public)/projects/components/bread-crumbs";

export default function Layout({
                                   children,
                               }:
                                   Readonly<{
                                       children: React.ReactNode;
                                   }>
) {
    return (
        <div className="flex flex-col w-full space-y-3">
            <BreadCrumbs className="ml-9"/>
            <div className="w-11/12 bg-[#fff] p-9 rounded-xl shadow-md border-gray-100 font-sans">
                {children}
            </div>
        </div>
    );
}