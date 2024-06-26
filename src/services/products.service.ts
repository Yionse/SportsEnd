import { Product } from '@/entities/Products.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { PropertyService } from './property.service';
import { ProductCommentService } from './productComment.service';

function getRadom(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly propertyService: PropertyService,
    private readonly productComment: ProductCommentService,
  ) {}

  // 获取一级分类下的商品
  async getOneCategoryGoods(oneCategory?: number) {
    return await this.productRepository.find({
      where: { oneCategoryId: oneCategory },
    });
  }

  // 获取二级分类下的商品
  async getTwoCategoryGoods(twoCategory?: number) {
    return await this.productRepository.find({
      where: { twoCategoryId: twoCategory },
    });
  }

  // 获取随机的一些商品
  async getNewProduct() {
    const products = await this.getOneCategoryGoods();
    const arr: Product[] = [];
    for (let i = 0; i < 4; i++) {
      arr.push(products[getRadom(products.length - 1)]);
    }
    return arr.map((item) => {
      return {
        ...item,
        id: item.productID,
        picture: item.url,
        title: item.productName,
        alt: item.productName,
      };
    });
  }

  // 获取首页轮播图数据
  async getProductList() {
    const arr: { name: string; children: Product[] }[] = [];
    const oneCategoryList = await this.categoryService.oneCategory();
    const products = await this.getOneCategoryGoods();
    oneCategoryList.forEach((item) => {
      const children: Product[] = products.filter(
        (product) => product.oneCategoryId === item.oneCategoryID,
      );
      arr.push({
        name: item.categoryName,
        children: children.slice(0, 10),
      });
    });
    return arr.map((item) => {
      return {
        ...item,
        children: item.children.map((item) => {
          return {
            ...item,
            id: item.productID,
            picture: item.url,
            title: item.productName,
            alt: item.productName,
            desc: item.description,
          };
        }),
      };
    });
  }

  // 获取商品详情
  async getDetailData(id: number) {
    let obj: {
      categories: {
        parentName: string;
        parentId: number;
        name: string;
        id: number;
        current?: string;
      };
      mainPictures: string[];
      skuList: {
        name: string;
        list: string[];
      }[];
    } & Product = {} as any;
    const comment = await this.productComment.getList(id);
    const currentProduct = await this.getIdProduct(id);
    obj.categories = await this.categoryService.getTwoOneCategory(
      currentProduct.twoCategoryId,
    );
    obj.categories.current = currentProduct.productName;
    obj.mainPictures = [currentProduct.url];
    obj = { ...obj, ...currentProduct };
    const property = currentProduct.property.split('-');
    const skuList: {
      name: string;
      list: string[];
    }[] = [];
    const allPropertyList = await this.propertyService.getAllPropertyList();
    property.forEach((item) => {
      const name = allPropertyList.find(
        (propertyObj) => propertyObj.propertyId === Number(item),
      );
      skuList.push({
        name: name.propertyName,
        list: name.propertyList.split('-'),
      });
    });
    obj.skuList = skuList;
    obj['comment'] = comment;
    return obj;
  }

  /**
   * 按照ID获取当前商品
   * @param id 商品ID
   * @returns 返回整个商品谁
   */
  async getIdProduct(id: number) {
    return this.productRepository.findOne({ where: { productID: id } });
  }

  // 搜索
  async search(key: string) {
    return this.productRepository.find({
      where: { productName: Like(`%${key}%`) },
    });
  }
}
