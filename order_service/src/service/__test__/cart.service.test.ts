import { CartRepositoryType } from "../../types/repository.type"
import * as Repository from "../../repository/cart.repository";
import { CreateCart } from "../../service/cart.service"
import { mock } from "node:test";

describe('cartService', () => { 
    let repo: CartRepositoryType

    beforeEach(() => {
        repo = Repository.CartRepository;
    });

    afterEach(() => {
        repo = {} as CartRepositoryType
    });

    it("should return correct data while creating cart", async() => {

        const mockCart = {
            title: "Iphone15",
            amount: 999.99
        }

        jest.spyOn(Repository.CartRepository, "create")
            .mockImplementationOnce(() => Promise.resolve({
                message: "fake response from cart repository",
                input: mockCart
            })
        );

        const res = await CreateCart(mockCart, repo);
        expect(res).toEqual({
            message: "fake response from cart repository",
            input: mockCart
        });
    });
});