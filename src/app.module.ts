import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/Address.entities';
import { Cart } from './entities/Carts.entities';
import { OneCategory } from './entities/OneCategory.entities';
import { Order } from './entities/Orders.entities';
import { Product } from './entities/Products.entities';
import { ProductsComment } from './entities/ProductsComment.entities';
import { Property } from './entities/Property.entities';
import { TwoCategory } from './entities/TwoCategory.entities';
import { User } from './entities/Users.entities';

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
        ProductsComment,
        Property,
        TwoCategory,
        User,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
