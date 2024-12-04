'use client'

import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";


import {NAV_LINKS} from "@/app/libs/constants";
import Link from "next/link";




export default function Navbar(){


    return (
        <div className="border-b border-gray-100 bg-[#fff]">
            <div className=" flex items-center justify-end p-4 justify-between">
                <nav className="hidden items-center space-x-3 text-sm md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="text-gray-900 h-full text-lg transition-all duration-300 ease-in-out px-3 py-2 rounded-md
                            hover:translate-y-1 hover:bg-gray-200 transform"

                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>



                <div className="flex items-center space-x-4 ">
                    <Link
                        className="inline-flex h-10 items-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium"
                        href="/signup"
                    >
                        Login
                    </Link>

                    <button className="inline-flex rounded-md " type="button">
                        <Avatar className="h-full">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle Menu</span>
                    </button>
                </div>
            </div>
        </div>
    );
}