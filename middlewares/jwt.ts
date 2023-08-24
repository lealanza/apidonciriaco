import { NextFunction, Request, Response } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
import User, {IUser} from '../models/users'

const validationJWT  = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-token'] as string;
    if(!token){
        res.status(401).json({
            msg: 'No hay token en la peticion'
        })
        return;
    }
    try {
        const keySecret = process.env.SECRET_KEY as string;
        const payload = jwt.verify(token, keySecret) as JwtPayload;
        const {id} = payload;
        const userConfirmed: IUser | null = await User.findById(id);
        if(!userConfirmed){
            res.status(401).json({
                msg: 'Token no valido'
            })
            return;
        
        }
        req.body.userConfirmed = userConfirmed;
        next();
    }
     catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

export default validationJWT;