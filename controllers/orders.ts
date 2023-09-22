import { Request, Response } from 'express';
import Order, { IOrder } from '../models/orders';
import User, { IUser } from '../models/users';

export const getOrders = async (req: Request, res: Response) => {
   const orders = await Order.find();
   res.json(orders);
}
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const {cellphone,direction,city,postalCode,state,products,status,total,
  }: IOrder = req.body;
  const {_id} = req.params;
  const userVerified = await User.findById({ _id });
  if (!userVerified) {
    res.status(404).json({
      alert: "Usuario no registrado",
    });
    return;
  } 
  try {
    const userId = userVerified._id;
   const orderNumber = await Order.countDocuments();
    const order = new Order({
      orderNumber:orderNumber+1,
      user: userId,
      cellphone,
      direction,
      city,
      postalCode,
      state,
      total,
      products,
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
      const {_id} = req.params;
      const deletedOrder = await Order.findByIdAndDelete(_id);
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

export const orderStatusChange = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const order = await Order.findById(_id);
  const statusOrder = order?.status;
  if(statusOrder === 'pending'){
    const { status }= req.body;
    try {
    let order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    let updatedOrder;
    if(status === 'canceled'){
      const orderCanceled = await Order.findByIdAndUpdate(_id, { status: "canceled" }, { new: true });
      res.status(200).json({
        alert:"La orden fue cancelada",
        order: orderCanceled?.status 
      })
      return;
    }
    if(status === 'paid'){
      updatedOrder = await Order.findByIdAndUpdate(_id, { status: "paid" }, { new: true, updatedAt: new Date() });
      if (!updatedOrder) {
        throw new Error('Order not found');
     }
      const orderDetails = await Order.findById(updatedOrder?._id);
      const user = await User.findById(orderDetails?.user);
      const userEmail = user?.email;
      const orderStatus= updatedOrder?.status;
      
    res.status(200).json({
      alert: "Order status updated",
      order: updatedOrder
    });
    }
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

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const userData =  await User.findById(_id);
    console.log(userData)
    if(!userData){
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }
    const orders= await Order.find({ user: userData._id });
    console.log(orders)
    if (orders.length <= 0) {
      res.status(404).json({
        message: 'No se encontraron órdenes para este usuario.',
      });
    }
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
}
