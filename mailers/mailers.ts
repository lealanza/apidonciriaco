import nodemailer from 'nodemailer';
import { IOrder } from '../models/orders';
import Product, {IProduct} from '../models/products';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'lanza.le4ndr0@gmail.com',
        pass: 'khwgmfrieibnhuim'
    },
    from:'lanza.le4ndr0@gmail.com'
})

export const sendEmail = async (to:string, name:string, code:string) => {
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject:"Codigo de verificacion de cuenta",
            text:`
            Hola ${name}, te enviamos este codigo de verificacion: ${code}.
            
            `
        
        }
        await transporter.sendMail(mailOptions)
        console.log('Email enviado')
    } catch (error) {
        console.error("Error al enviar el correo",error)
    }
}

export const sendEmailResetPassword = async (to:string, password:string) => {
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject:"Has solicitado cambiar tu contraseña",
            text:`
            Hola has cambiado tu contraseña.
            Tu nueva contraseña es: ${password}.`
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error al enviar el correo",error)
    }

}
export const sendEmailLogin = async (to:string, name:string, location?: { latitude: number; longitude:number }) => {
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject:"Has iniciado sesion",
            text:`
            Hola ${name}, has iniciado sesion. ${new Date().toString()}.
            Ubicacion: Latitude is ${location?.latitude ?? 'unknown'}, Longitude is ${location?.longitude ?? 'unknown'}.`
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error al enviar el correo de inicio de sesion ",error)
    }
}



export const sendEmailConfirmed = async (to:string, order:IOrder) => {
    try {
        
        const mailOptions = {
            from: '"Leandro Lanza" XXXXXXXXXXXXXXXXXXXXXXX',
            to,
            subject:"Has confirmado tu pedido",
            text:`
            Hola has confirmado tu pedido.
            el pedido ya se encuentra ${(order.status === 'paid') ? 'confirmado' : ''}
            fecha: ${order.updatedAt.toString()}.
            `
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error al enviar el correo de confirmacion ",error)
    }
}