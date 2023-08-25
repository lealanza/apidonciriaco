import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'lanza.le4ndr0@gmail.com',
        pass: 'khwgmfrieibnhuim'
    },
    from:'lanza.le4ndr0@gmail.com'
})

export const sendEmailLogin = async (to:string, name:string) => {
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject:"Inicio de sesion",
            text:`
            Hola ${name}, has iniciado sesion correctamente. ${new Date().toString()}.
            `
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error al enviar el correo de inicio de sesion ",error)
    }
}