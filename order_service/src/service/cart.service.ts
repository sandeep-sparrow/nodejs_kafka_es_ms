import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository.type";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {
    // make call to our catalog microservice (sync call!)
    const product = await GetProductDetails(input.productId);

    if(product.stock < input.qty){
        throw new Error("Product is Out Of Stock!");
    }
    const data = await repo.create(input);
    return data;
};

export const GetCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.find(input);
    return data;
};

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.update(input);
    return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.delete(input);
    return data;
};