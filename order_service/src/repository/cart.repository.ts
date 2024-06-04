import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.type";

const createCart = async(input: any): Promise<{}> => {
    const result = await DB.insert(carts).values({
        customerId: 123,
    }).returning({ cartId: carts.id });

    console.log(result);

    return Promise.resolve({ 
        message: "Product Create Success!", 
        input: result,
    });
};

const findCart = async(input: any): Promise<{}> => {
    const result = await DB.query.carts.findFirst(input);
    return Promise.resolve({
        message: "Product Get Success!", 
        input: result 
    });
};

const updateCart = async(input: any): Promise<{}> => {
    const result = await DB.update(input);
    return Promise.resolve({
        message: "Product Get Success!", 
        input: result 
    });
};

const deleteCart = async(input: any): Promise<{}> => {
    const result = await DB.delete(input);
    return Promise.resolve({
        message: "Product Get Success!", 
        input: result 
    });
};

export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart,
};