import express, {Express} from 'express'
import { conectDB } from '../lib/config'
import routerUser from '../router/user'
import routerOrder from '../router/orders'
import routerProduct from '../router/products'
import categoryRoutes from '../router/categories'
//mport routerProovedor from '../router/proovedor'
import cors from 'cors'

export class Server{
    app: Express;
    createUser: string;
    order: string;
    product: string;
    category: string;
    constructor(){
        this.app = express();
        this.start();
        this.middlewares();
        this.createUser= "/user"
        this.order= "/order"
        this.product="/product"
        this.category="/category"
        this.router();
    }

    async start ():Promise<void>{
        await conectDB();
    }

    middlewares ():void{
        this.app.use(express.json());
        this.app.use(cors(
            {
                origin:'http://localhost:3000'
            }
        ))
    }
    router ():void{
        this.app.use(this.createUser, routerUser);
        this.app.use(this.order, routerOrder);
        this.app.use(this.product, routerProduct)
        this.app.use(this.category, categoryRoutes)
    }

    listen ():void{
        this.app.listen(process.env.PORT, () => {
            console.log(`Server on port ${process.env.PORT}`)
        })
    }
}