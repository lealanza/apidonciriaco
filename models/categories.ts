import {model, Schema, Model} from 'mongoose'

export interface ICategory{
    _id:string;
    name:string;
    description:string;
    date:Date;
}

const categorySchema = new Schema<ICategory>({
    
    name:{type:String, required:true},
    description:{type:String, required:true},
    date:{type:Date, default:Date.now},
})

categorySchema.methods.toJSON = function(){
    const {__v, date, ...category} = this.toObject();
    return category;
}

export const Category:Model<ICategory> = model('Category',categorySchema)