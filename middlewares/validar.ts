import { NextFunction, Request, Response } from "express";

export const isVerfiied = (req: Request, res: Response, next: NextFunction) => {
    const {verified} = req.body.usuarioConfirmado;
    if(!verified) {
        res.status(401).json({
            message: "Usuario no verificado"
        })
        return
    }

    next()
}
