
import {PROJECTS_URLS} from "@/app/(public)/projects/constants";
import Link from "next/link";
import H from "@/app/(public)/projects/components/header";


export default function ProjectsPage(){

    return (
        <div className="space-y-5">
            <H content="My Projects" />

            <hr/>

            <div className="flex flex-col w-full space-y-8 px-4">
                <p className="text-lg">Here are my main topic with projects:</p>

                <ul className="space-y-6">
                    {PROJECTS_URLS.map((project) =>
                        <li key={project.name} className="">
                            <Link href={project.href}>
                                <p className="text-xl font-bold">{project.name}</p>
                            </Link>

                            <p>Content:</p>

                            <ul className="pl-4">
                                {project.subLinks.map((subLink) => (
                                    <Link href={subLink.href} key={subLink.href}>
                                        <li className="text-lg italic">{subLink.name}</li>
                                    </Link>
                                ))}
                            </ul>

                            <hr className="border-t border-gray-200 w-1/4" />
                        </li>
                    )}

                </ul>
            </div>
        </div>
    )
}