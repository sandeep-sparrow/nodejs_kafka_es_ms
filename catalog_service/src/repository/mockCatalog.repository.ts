import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRespository implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        const mockProduct = {
            ...data,
            id: 123,
        } as Product;
        return Promise.resolve(mockProduct);
    }

    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
    }

    delete(id: any) {
        throw new Error("Method not implemented.");
    }

    find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }

    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}