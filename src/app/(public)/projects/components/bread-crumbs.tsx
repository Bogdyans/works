'use client';

import {usePathname} from "next/navigation";

export default function BreadCrumbs({ className }: {className?: string}) {
    const path = usePathname().slice(1);
    let bp = "";

    return (
        <div className={`text-3xl font-bold flex flex-row space-x-1 ${className}`}>

            {

                path.split("/").map((str) => {
                    bp = bp.concat("/" + str);

                    return (
                        <div key={str} className="flex space-x-1"><
                            p>/</p>
                            <a href={bp}>{str.at(0)?.toUpperCase().concat(str.slice(1))}</a>
                        </div>
                    )
                })
            }
        </div>
    );
}