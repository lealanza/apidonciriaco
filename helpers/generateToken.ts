import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id: string):Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id }
        jwt.sign(payload, process.env.SECRET_KEY as string, {
            expiresIn: "2h"
        }, (err, token:string | undefined ) => {
            if (err) {
                reject(err)
            } else {
                resolve(token as string)
            }
        })
    })
}