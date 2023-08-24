import { Router } from "express";
import { check } from "express-validator";
import { createCategoy, getCategories } from "../controllers/categories";
import { errorHandler } from "../middlewares/errores";


const categoryRoutes = Router();

categoryRoutes.post('/create',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
],errorHandler, createCategoy)

categoryRoutes.get('/get', errorHandler, getCategories)

export default categoryRoutes;