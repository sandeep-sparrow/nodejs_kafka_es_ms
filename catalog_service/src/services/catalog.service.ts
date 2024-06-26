import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository){
        this._repository = repository;
    }
    
    async createProduct(input: any){
        const data = await this._repository.create(input);
        if(!data){
            throw new Error("unable to create product");
        }
        return data;
    }

    async updateProduct(input: any){
         const data = await this._repository.update(input);
         // emit event to update record in Elastic Search
         if(!data.id){
            throw new Error("unable to update product");
         }
         return data;
    }

    async getProducts(limit: number, offset: number){
        const products = await this._repository.find(limit, offset);
        if(!products){
            throw new Error("unable to get products");
        }
        return products;
    }

    async getProduct(id: number){
        const product = await this._repository.findOne(id);
        if(!product){
            throw new Error("unable to get product by id");
        }
        return product;
    }

    async deleteProduct(id: number){
        const productId = await this._repository.delete(id);
        // emit event to delete record in Elastic Search
        return productId; 
    }
}