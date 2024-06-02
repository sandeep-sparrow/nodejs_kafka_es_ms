import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class CatalogRespository implements ICatalogRepository { // we are going to call our ORM from here!

    _prisma: PrismaClient

    constructor() {
        this._prisma = new PrismaClient()
    }

    async create(data: Product): Promise<Product> {
        return this._prisma.product.create({
            data: data,
        });
    }

    async update(data: Product): Promise<Product> {
        return this._prisma.product.update({
            where: {id: data.id},
            data: data,
        });
    }

    async delete(id: any) {
        return this._prisma.product.delete({
            where: { id }
        });
    }

    async find(limit: number, offset: number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset,
        });
    }
    
    async findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where: { id }
        });

        if(product){
            return Promise.resolve(product);
        }else{
            throw new Error("poduct not found!");
        }
    }
}