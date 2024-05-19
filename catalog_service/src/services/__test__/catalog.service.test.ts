import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRespository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { Product } from "../../models/product.model";

const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 10, max: 100}),
        ...rest,
    };
}

describe("catalogService", () => {

    let repository: ICatalogRepository;

    // setup something, pre-requisite
    beforeEach(() => {
        repository = new MockCatalogRespository()
    });

    describe("createProduct", () => {
        test("should create product", async() => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            }); 
            const result = await service.createProduct(requestBody);
            expect(result).toMatchObject({
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                id: expect.any(Number),
            });
        });

        test("should throw error with unable to create product", async() => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });
            jest
                .spyOn(repository, 'create')
                .mockImplementationOnce(() => Promise.resolve({} as Product));
            await expect(service.createProduct(requestBody)).rejects.toThrow("unable to create product");
        });

        test("should throw error with product already exists", async() => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });
            jest
                .spyOn(repository, 'create')
                .mockImplementationOnce(() => Promise.reject(new Error("product already exists")));
            await expect(service.createProduct(requestBody)).rejects.toThrow("product already exists");
        });
    });

    describe("updateProduct", () => {
        test("should update product", async() => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({min: 10, max: 1000}),
            });
            const result = await service.updateProduct(requestBody);
            expect(result).toMatchObject(requestBody);
        });

        test("should throw error with product does not exists", async() => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });
            jest
                .spyOn(repository, "update")
                .mockImplementationOnce(() => 
                    Promise.reject(new Error("product does not exists")))
                ;
            await expect(service.updateProduct(requestBody)).rejects.toThrow("product does not exists");
        });
    })

    // clean up
    afterEach(() => {
        repository = {} as MockCatalogRespository;
    });
});