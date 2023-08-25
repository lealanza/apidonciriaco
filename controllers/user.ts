import { Response, Request } from "express";
import User, { IUser } from "../models/users";
import bcsrypt from "bcryptjs";
import randomstring from "randomstring";
import { sendEmail, sendEmailAccountVerified, sendEamilLogin} from "../mailers/mailers";
import { generateToken } from "../helpers/generateToken";




export const createUser = async (req: Request, res: Response) => {
    const userData: IUser = new User(req.body);
    const { userName, email, password, name, lastName } = userData;
    if (!userName || !email || !password || !name || !lastName) {
        return res.status(400).json({
            message: "Faltan Datos"
        })
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res.status(400).json({
            message: "El email ya existe"
        })

    }
    const salt = bcsrypt.genSaltSync();
    userData.password = bcsrypt.hashSync(password, salt);
    const adminKey = req.headers["admin-key"];
    if (adminKey === "admin") {
        userData.role = true;
    }
    const newCode = randomstring.generate(6);
    userData.code = newCode;
    const newUser = new User(userData);
    await newUser.save();
    await sendEmail(email, userName, newCode);
    res.json({
        message: "Usuario Creado",
        newUser,
    })
}

export const getUser = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json({
        users
    });

}

export const deleteUser = async (req: Request, res: Response) => {
    
    try {
        const { _id } = req.params;
        const user = User.findById({_id})
        await User.findByIdAndRemove({ _id });
        res.json({
            message: "Usuario Eliminado"
        })
    if (!user) {
        return res.status(400).json({
            message: "El usuario no existe"
        })
    
    }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario"
        })
    }
    
}
export const login = async (req: Request, res: Response) => {
    const { email, password }:IUser = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "El usuario no existe"
            })
            return
        }
        const validPassword = bcsrypt.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                message: "Contraseña incorrecta"
            })
            return
        }
        const token = await generateToken(user.id);
        sendEamilLogin(email, user.name),
        res.json({
            message: "Login Correcto",
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al logearse"
        })
    }
}


export const verifiedUser = async (req: Request, res: Response) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "El usuario no existe"
            })
            return

        }
        if (user.verified) {
            res.status(400).json({
                message: "El usuario ya esta verificado"
            })
            return
        }
        if (user.code !== code) {
            return res.status(400).json({
                msg: "El codigo es incorrecto"
            })
        }
        const userAuth = await User.findOneAndUpdate({ email}, { verified: true });
        sendEmailAccountVerified(email, user.name)
        res.status(200).json({
            msg:"Usuario verificado con existo"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error al verificar usuario"
        })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const { email, password } :IUser = req.body;
    const salt = bcsrypt.genSaltSync();
    const newPassword = bcsrypt.hashSync(password, salt);
    try {
        const user = await User.findOneAndUpdate({ email }, { password: newPassword });
        res.status(200).json({
            message: "Contraseña cambiada con exito"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error al cambiar contraseña"
        })
    }

}
