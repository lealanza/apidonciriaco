import express, { Express } from 'express';
import { conectDB } from '../lib/config';
import routerUser from '../router/user';
import routerOrder from '../router/orders';
import routerProduct from '../router/products';
import categoryRoutes from '../router/categories';
import cors from 'cors';
import path from 'path'; 
import fileUpload from 'express-fileupload';

export class Server {
    app: Express;

    constructor() {
        this.app = express();
        this.start();
        this.middlewares();
        this.router();
    }

    async start(): Promise<void> {
        await conectDB();
    }
    
    middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors({ origin: '*' }));
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir: path.join(__dirname, 'images', 'tmp')
        }));
    }

    router(): void {
        this.app.use('/user', routerUser);
        this.app.use('/order', routerOrder);
        this.app.use('/product', routerProduct);
        this.app.use('/category', categoryRoutes);
        
    }

    listen(): void {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server on port ${port}`);
        });
    }
}
