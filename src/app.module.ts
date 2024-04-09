import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/Address.entities';
import { Cart } from './entities/Carts.entities';
import { OneCategory } from './entities/OneCategory.entities';
import { Order } from './entities/Orders.entities';
import { Product } from './entities/Products.entities';
import { Property } from './entities/Property.entities';
import { TwoCategory } from './entities/TwoCategory.entities';
import { User } from './entities/Users.entities';
import { ResponseMiddleware } from './Middleware/Response.middleware';
import { UserController } from './controllers/user.controller';
import { UserServices } from './services/user.service';
import { CateGoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/products.service';
import { ProductController } from './controllers/products.controller';
import { PropertyService } from './services/property.service';
import { CartService } from './services/carts.service';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { OrderController } from './controllers/orders.controller';
import { OrderService } from './services/order.service';
import { ProductComment } from './entities/ProductComment.entities';
import { ProductCommentService } from './services/productComment.service';

// 管理端
import { MProductController } from './BackManagement/controllers/MProduct';
import { MProductService } from './BackManagement/services/MProduct.service';
import { MPropertyController } from './BackManagement/controllers/MProperty';
import { MPropertyService } from './BackManagement/services/MProperty.service';
import { MOrderController } from './BackManagement/controllers/MOrder';
import { MOrderService } from './BackManagement/services/MOrder.service';
import { MCommentController } from './BackManagement/controllers/MComment';
import { MCommentService } from './BackManagement/services/MComment.service';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: process.env.PORT,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: `${process.env.DATABASE}`,
      entities: [
        Address,
        Cart,
        OneCategory,
        Order,
        Product,
        Property,
        TwoCategory,
        User,
        ProductComment,
      ],
    }),
    TypeOrmModule.forFeature([
      Address,
      Cart,
      OneCategory,
      Order,
      Product,
      Property,
      TwoCategory,
      User,
      ProductComment,
    ]),
  ],
  controllers: [
    UserController,
    CateGoryController,
    ProductController,
    AddressController,
    OrderController,
    // 管理端
    MProductController,
    MPropertyController,
    MOrderController,
    MCommentController,
  ],
  providers: [
    UserServices,
    CategoryService,
    ProductService,
    ProductService,
    PropertyService,
    CartService,
    AddressService,
    OrderService,
    ProductCommentService,
    // 管理端
    MProductService,
    MPropertyService,
    MOrderService,
    MCommentService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('/');
  }
}
