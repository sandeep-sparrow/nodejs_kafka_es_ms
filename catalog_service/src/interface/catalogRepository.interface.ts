import { Product } from "../models/product.model";

export interface ICatalogRepository { // why it is needed?
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: any): any;
    find(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
}