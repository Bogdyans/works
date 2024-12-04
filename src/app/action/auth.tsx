import {FormState, SignupFormSchema} from "@/app/libs/definition";

export async function signup(state: FormState, formData: FormData) {

    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }


}