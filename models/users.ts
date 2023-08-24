import {Model, model, Schema} from 'mongoose';

export interface IUser {
    userName: string;
    email: string;
    password: string;
    name:string;
    lastName:string;
    code:string;
    role: boolean;
    verified: boolean;
}

const userSchema = new Schema<IUser>({
    userName: {type: String, required: [true, 'El nombre de usuario es requerido']},
    email: {type: String, required: [true,'El correo es requerido'], unique: true},
    password: {type: String, required: [true, 'La contraseña es requerida']},
    name: {type: String, required: [true, 'El nombre es requerido']},
    lastName: {type: String, required: [true, 'El apellido es requerido']},
    code:{type: String},
    role: {type: Boolean, default: false},
    verified: {type: Boolean, default: false}
},{timestamps: true});

userSchema.methods.toJSON = function () {
    const {__v, password, code, ...user} = this.toObject();
    return user
}

const User: Model<IUser> = model('User', userSchema);

export default User
