import {Request, Response} from 'express'
import {Category} from '../models/categories'

export const createCategoy =async (req:Request, res:Response) => {
        const {name, description} = req.body;
        try {
            const category = new Category({name, description});
            await category.save();
            res.status(201).json({category});
        
            
        } catch (error) {
            res.status(500).send('Error del servidor');
            
        }
}


export const getCategories = async (req:Request, res:Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
}