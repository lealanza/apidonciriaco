import { Request, Response } from 'express';
import Order, { IOrder } from '../models/orders';
import { ObjectId } from 'mongodb';
import User, { IUser } from '../models/users';
import { sendEmailConfirmed } from '../mailers/mailers';
import Product, { IProduct } from '../models/products';




export const getOrders = async (req: Request, res: Response) => {
   const orders = await Order.find();
   res.json(orders);
}
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const {cellphone,email,direction,city,postalCode,state,products,status,total,
  }: IOrder = req.body;
  const userVerified = await User.findOne({ email });
  if (!userVerified) {
    res.status(404).json({
      alert: "Usuario no registrado",
    });
    return;
  }
  const productsDetails = await Product.find({ title: { $in: products.map((p) => p.title) } });
  if (!productsDetails || productsDetails.length !== products.length|| (productsDetails.some((p) => (p.stock as number) <= 0))) {
    res.status(404).json({
      alert: "Uno o más productos no encontrados",
    });
    return;
  }
  try {
    const userId = userVerified._id;
    const userName = userVerified.name;
    const orderProducts = products.map((product) => {
      const foundProduct = productsDetails.find((p) => p.title === product.title);
      const totalPrice = foundProduct?.price as any * product.quantity;
      return {
        product: foundProduct ? foundProduct._id : undefined,
        quantity: product.quantity,
        totalPrice,
      };
    });
    const orderNumer= await Order.countDocuments();
    const orderTotal = orderProducts.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const order = new Order({
      orderNumber:orderNumer+1,
      user: userId,
      cellphone,
      direction,
      city,
      postalCode,
      state,
      total:orderTotal,
      products: orderProducts,
      status: "pending",
      createdAt: new Date(),
    });
    await order.save();
    res.status(201).json({
      message: "Orden creada correctamente",
      data: order,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
}
export const deleteOrder = async (req: Request, res: Response) => {
    try {
      const id: ObjectId | string = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({
          message: 'Orden no encontrada'
        });
      }
      res.json({
        message: 'Orden eliminada correctamente',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error del servidor");
    }
}
export const deleteAllOrders = async (req: Request, res: Response) => {
    try {
        const deletedOrders = await Order.deleteMany({});
        if (!deletedOrders) {
            return res.status(404).json({
                message: 'Ordenes no encontradas'
            });
        }
        res.json({
            message: 'Ordenes eliminadas correctamente',
        })

    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
}
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  const statusOrder = order?.status;
  if(statusOrder === 'pending'){
    const { status }= req.body;
    try {
    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    let updatedOrder;
    if(status === 'canceled'){
      const orderCanceled = await Order.findByIdAndUpdate(id, { status: "canceled" }, { new: true });
      res.status(200).json({
        alert:"La orden fue cancelada",
        order: orderCanceled?.status 
      })
      return;
    }
    if(status === 'paid'){
      updatedOrder = await Order.findByIdAndUpdate(id, { status: "paid" }, { new: true, updatedAt: new Date() });
      if (!updatedOrder) {
        throw new Error('Order not found');
     }
      const orderDetails = await Order.findById(updatedOrder?._id);
      const user = await User.findById(orderDetails?.user);
      const userEmail = user?.email;
      const orderStatus= updatedOrder?.status;
      sendEmailConfirmed(userEmail as string, updatedOrder);
      const productIds = updatedOrder?.products.map((p) => p.product);
      const quantities = updatedOrder?.products.map((p) => p.quantity);
      if (productIds && quantities && productIds.length === quantities.length) {
        const updates = [];
        for (let i = 0; i < productIds.length; i++) {
          const productId = productIds[i];
          const quantity = quantities[i];
          updates.push(Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } }).exec());
        }
        await Promise.all(updates);
      } 
    }
    res.status(200).json({
      alert: "Order status updated",
      order: updatedOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
  }
  if(statusOrder === 'paid'){
    res.status(200).json({
      alert:"La orden ya fue pagada"
    })
  }
}

