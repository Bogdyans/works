'use client'

import {FormEvent, useState} from "react";
import {Input} from "postcss";
import BInput from "@/app/(public)/components/input";


export default function SignUp(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

    }

    return (

        <form
            className="w-[470px] bg-[#fff] flex flex-col space-y-6 items-center border border-gray-100 p-8 rounded-xl shadow-md"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className="m-auto text-3xl font-bold">Sign Up</h1>

            <div className="mx-auto space-y-3 flex flex-col w-full">
                <hr className="w-[100%] mx-auto border-t border-gray-300"/>

                <BInput
                    placeholder="Your Username"
                    name="username"
                    id="username"
                    type="text"
                    onChange={setUsername}
                    value={username}
                />

                <BInput
                    placeholder="Email"
                    name="email"
                    id="email"
                    type="email"
                    onChange={setEmail}
                    value={email}
                />

                <hr className="w-[80%] mx-auto border-t border-gray-300"/>

                <BInput
                    placeholder="Make a Password"
                    name="password"
                    id="password"
                    type="password"
                    onChange={setPassword}
                    value={password}
                />

                <BInput
                    className="plac"
                    placeholder="Confirm your Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    onChange={setConfirmPassword}
                    value={confirmPassword}
                />

                <hr className="w-[100%] mx-auto border-t border-gray-300"/>
                <button
                    type="submit"
                    className="border shadow-sm rounded-lg border-gray-100 hover:border-gray-200 focus:shadow-md
                    hover:bg-black hover:text-[#fff]
                    transition ease-in-out duration-300
                     h-[40px]"
                >Sign Up</button>
            </div>
        </form>

    )
}