'use client'
import H from '../../components/header';
import React from "react";
import BInput from "@/app/(public)/components/input";
import {Button} from "@/components/ui/button";
import {MOCK_MSGS} from "@/app/(public)/projects/prv/chat/constants";
import {Message} from "@/app/(public)/projects/prv/chat/types";


export default function ChatPage() {
    const [messages, setMessages] = React.useState([]);
    const [access, setAccess] = React.useState(false);
    const [name, setName] = React.useState("");
    const [currentMessage, setCurrentMessage] = React.useState("");




    if (access) {

    }

    return (
        <div className="space-y-2">
            <H content="Page"/>

            <div
                className={`w-full h-[500px] bg-gray-100 rounded-xl shadow-inner ${!access ? "py-32" : "px-5 py-5"}`}
            >
                {
                    !access ?
                        (
                            <div className="flex flex-col space-y-5 mx-auto items-center">
                                <p className="text-lg text-le">Choose yourself a name: </p>
                                <BInput
                                    className="max-w-md"
                                    value={name}
                                    onChange={setName}
                                />
                                <Button
                                    className="shadow-sm"
                                    onClick={() => {
                                        setAccess(true);
                                        setMessages(MOCK_MSGS);
                                    }}
                                >Enter</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-5 mx-auto space-between h-full">
                                <div className='h-full p-2 space-y-4'>
                                    {
                                        messages.map((message: Message) => (
                                            <div key={message.id}
                                                className="space-y-1 w-auto max-w max-w-xl"
                                            >
                                                <div className="flex flex-row justify-between space-x-5 px-7">
                                                    <p className="text-sm font-bold">{message.author}</p>
                                                    <p className="text-sm">{message.time}</p>
                                                </div>
                                                <div
                                                    className="min-w-fit bg-[#fff] py-1 px-3 rounded-xl"
                                                >
                                                    <p className="text-lg">{message.message}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <BInput
                                    className="absolute w-[68.4%]"
                                    onChange={setCurrentMessage}
                                />
                            </div>
                        )
                }
            </div>
        </div>
    )
}