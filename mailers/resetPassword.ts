import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'lanza.le4ndr0@gmail.com',
        pass: 'khwgmfrieibnhuim'
    },
    from:'lanza.le4ndr0@gmail.com'
})

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