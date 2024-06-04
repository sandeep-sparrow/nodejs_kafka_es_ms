import { CartRepositoryType } from "../types/repository.type";

const createCart = async(input: any): Promise<{}> => {
    // connect to db and perform db operation
    return Promise.resolve({ 
        message: "fake response from cart repository", 
        input
    });
};

const findCart = async(input: any): Promise<{}> => {
    return Promise.resolve({});
};

const updateCart = async(input: any): Promise<{}> => {
    return Promise.resolve({});
};

const deleteCart = async(input: any): Promise<{}> => {
    return Promise.resolve({});
};

export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart,
};