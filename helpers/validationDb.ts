import { sendEmail } from "../mailers/mailers";
import User, { IUser } from "../models/users";

export const existingEmail = async (email: string) => {
    const existEmail:IUser | null = await User.findOne({ email });
    if(existEmail && existEmail.verified){
        throw new Error("Email already exist");
    }
    if(existEmail && !existEmail.verified){
        await sendEmail(email, existEmail.name as string, existEmail.code as string);
        throw new Error("Email already exist but not verified");
    }
}


