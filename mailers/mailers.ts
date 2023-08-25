import nodemailer from 'nodemailer';
import { IOrder } from '../models/orders';



export const sendEmail = async (to:string, name:string, code:string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lanza.le4ndr0@gmail.com',
          pass: 'khwgmfrieibnhuim',
        },
      });
    
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
export const sendEamilLogin = async (to:string, name:string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lanza.le4ndr0@gmail.com',
          pass: 'khwgmfrieibnhuim',
        },
      });
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject:"Nuevo inicio de sesion",
            text:`
            Hola ${name}, has iniciado sesion correctamente.
            Hora ${new Date().toString()}
            `
        }
        await transporter.sendMail(mailOptions)
    }
    catch{
        console.error("Error al enviar el correo")
    
    }
    
}

export const sendEmailConfirmed = async (to:string, order:IOrder) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lanza.le4ndr0@gmail.com',
          pass: 'khwgmfrieibnhuim',
        },
      });
    try {
        
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject:"Has confirmado tu pedido",
            text:`
            Hola has confirmado tu pedido.
            Pedido numero: ${order.orderNumber}.
            el pedido ya se encuentra ${(order.status === 'paid') ? 'confirmado' : ''}
            fecha: ${order.updatedAt.toString()}.
            `
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error al enviar el correo de confirmacion ",error)
    }
}

export const sendEmailAccountVerified = async (to:string, name:string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lanza.le4ndr0@gmail.com',
          pass: 'khwgmfrieibnhuim',
        },
      });
      try {
        const mailOptions = {
            from: '"Leandro Lanza" XXXXXXXXXXXXXXXXXXXXXXX',
            to,
            subject:"Cuenta verificada",
            text:`
            Hola ${name}, tu cuenta fue verificada.
            `
        }
        await transporter.sendMail(mailOptions)
      }
      catch (error) {
        console.error("Error al enviar el correo ",error)
      }
}