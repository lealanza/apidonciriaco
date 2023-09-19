import { NextFunction, Request, Response } from "express";
import {ROLES} from '../helpers/roles'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const {role} = req.body.userConfirmed;
    if(role !== ROLES.admin){
     res.status(401).json({
            message: 'Usuario no autorizado, tienes que ser administrador'
        })
        return;
    
    }
    next(); 
}