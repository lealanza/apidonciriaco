import Product from "../models/products";
import { Request, Response, NextFunction } from "express";
import { Category, ICategory } from "../models/categories";
import { uploadImages, deleteImages } from '../lib/cloudinary';
import fs from "fs-extra";


export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, price, ganancia, stock, description, category } = req.body;
  const images = req.files;
  try {
    if (!Array.isArray(images))  {
      throw new Error("No se encontraron imágenes");
    }
    const cloudinaryResults = await Promise.all(
      images.map(async (image) => {
        const uploadedImage = await uploadImages(image.path);
        return {path:image.path, public_id: uploadedImage.public_id,  url: uploadedImage.url, secure_url: uploadedImage.secure_url 
        };
      })
      
    );
    const product = new Product({
      title,
      price,
      ganancia,
      stock,
      description,
      category,
      images:cloudinaryResults,
    });
    await product.save();
    cloudinaryResults.forEach((image) => {
      fs.unlink(image.path, (err) => {
          if (err) {
              console.error(err);
          }
      });
    });

    res.status(201).json({ 
      product
     });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
}
export const getProductsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    if (!product) {
     res.status(404).json({ msg: "Producto no encontrado" });
     return
    }

    res.status(200).json({ product  });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
       res.status(404).json({ msg: "Producto no encontrado" });
       return
    }
    
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try{
        const { id } = req.params;
        const { price, ganancia, finalPrice, stock, description } = req.body;
        const product = await Product.findByIdAndUpdate(id, { 
            price,
            ganancia,
            finalPrice,
            stock,
            description,
            
        }, { new: true });
        if (!product) { 
            res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json({ 
            msg: "Producto actualizado",
            product });
        }
        catch (error) {
            res.status(500).send("Error del servidor");
        }

}

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    try {
        const { name } = req.body;
        const categoryDetails: ICategory | null = await Category.findOne({ name: name });

        if (!categoryDetails) {
            res.status(404).json({ message: 'Categoría no encontrada' });
            return;
        }

        const productsInCategory = await Product.find({ category: categoryDetails._id })
            .populate('category'); // Esto popula los detalles de la categoría en cada producto

        res.status(200).json({ products: productsInCategory });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
}
