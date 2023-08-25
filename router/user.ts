import { Router } from "express";
import {check} from 'express-validator'
import { createUser, deleteUser, getUser, login, verifiedUser, resetPassword } from "../controllers/user";
import { existingEmail } from "../helpers/validationDb";
import { errorHandler } from "../middlewares/errores";





const userRoutes = Router();

userRoutes.post("/create",
    [check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').not().isEmpty().isLength({min:6}),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email').custom(existingEmail),
    errorHandler,
], createUser)
userRoutes.patch('/verified',[
    check('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    check('code', 'El codigo es obligatorio').not().isEmpty(),
    errorHandler,
], verifiedUser)


userRoutes.post('/login',[
    check('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').not().isEmpty().isLength({min:6}) ],
    errorHandler, 
    login)
userRoutes.get('/get',errorHandler, getUser)
userRoutes.delete('/delete/',errorHandler, deleteUser)
userRoutes.patch('/reset',[
    check('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').not().isEmpty().isLength({min:6}),
],errorHandler, resetPassword)


export default userRoutes;