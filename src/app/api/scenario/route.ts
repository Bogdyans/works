import {NextResponse} from "next/server";
import {CANCEL, steps} from "@/app/api/scenario/libs/steps";


export async function POST(req: Request) {
    const { message, currentStep } = await req.json();
    const lowercaseMessage: string = message.toLowerCase();

    console.log(message, " ", currentStep);

    let ans =  getMessage(currentStep);


    if (currentStep.length === 0 || lowercaseMessage === CANCEL) {
        ans =  getMessage("start");
        //console.log(ans);
        return NextResponse.json({ message: ans, currentStep: "start" } );
    }

    if (currentStep === "weather"){
        ans = getMessage("show_weather", lowercaseMessage);
        return NextResponse.json({ message: ans, currentStep: "start_over" } );
    }

    let nextStep = getNextStep(lowercaseMessage, currentStep);

    if (!ans || !nextStep) {
        ans = "Sorry, I couldn't understand you"
        return NextResponse.json({ message: ans, currentStep } );
    }



    ans = getMessage(nextStep);
    if (nextStep === "start_over") nextStep = "start";
    return NextResponse.json({ message: ans, currentStep: nextStep } );
}

function getMessage(name: string, context = ""){
    const step =  steps.filter((s) => s.name === name)[0];
    if (!step) return '';

    return step.content(context);
}

function getNextStep(msg: string, currentStep: string){
    const step =  steps.filter((s) => s.name === currentStep)[0];
    if (!step) return null;

    if (step.next.length === 0) return "start_over";

    const nextStep = step.next.filter((vr) => vr === msg)[0];
    if (!nextStep) return null;

    console.log(nextStep);

    return nextStep;
}