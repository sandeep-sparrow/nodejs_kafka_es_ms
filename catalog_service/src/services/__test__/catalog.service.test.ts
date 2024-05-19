import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRespository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { Product } from "../../models/product.model";
import { Factory } from 'rosie'; // factory for generating random Array's of Data

const productFactory = new Factory<Product>()
    .attr("id", faker.number.int({min: 1, max: 1000}))
    .attr("description", faker.commerce.productDescription())
    .attr("name", faker.commerce.productName())
    .attr("stock", faker.number.int({ min: 10, max: 100}))
    .attr("price", +faker.commerce.price());

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
    let service: CatalogService;

    // setup something, pre-requisite
    beforeEach(() => {
        repository = new MockCatalogRespository()
        service = new CatalogService(repository);
    });

    describe("createProduct", () => {
        test("should create product", async() => {
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
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });
            jest
                .spyOn(repository, 'create')
                .mockImplementationOnce(() => Promise.resolve({} as Product));
            await expect(service.createProduct(requestBody)).rejects.toThrow("unable to create product");
        });

        test("should throw error with product already exists", async() => {
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
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({min: 10, max: 1000}),
            });
            const result = await service.updateProduct(requestBody);
            expect(result).toMatchObject(requestBody);
        });

        test("should throw error with product does not exists", async() => {
            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });
            jest
                .spyOn(repository, "update")
                .mockImplementationOnce(() => 
                    Promise.reject(new Error("product does not exists")));
            await expect(service.updateProduct(requestBody)).rejects.toThrow("product does not exists");
        });
    });

    describe("getProducts", () => {
        test("should get products by offset and limit", async() => {
            const randomLimit = faker.number.int({min: 10, max: 50});
            const products = productFactory.buildList(randomLimit);
            jest
                .spyOn(repository, 'find')
                .mockImplementationOnce(() => Promise.resolve(products));
            const result = await service.getProducts(randomLimit, 0);
            expect(result.length).toEqual(randomLimit);
            expect(result).toMatchObject(products);
        })
    })

    // clean up
    afterEach(() => {
        repository = {} as MockCatalogRespository;
    });

    // clean up All
    afterAll(() => {
        service = {} as CatalogService;
    });
});