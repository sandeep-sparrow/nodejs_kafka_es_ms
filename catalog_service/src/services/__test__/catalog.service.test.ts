import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRespository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";

describe("catalogService", () => {

    let repository: ICatalogRepository;

    // setup something, pre-requisite
    beforeEach(() => {
        repository = new MockCatalogRespository()
    });

    describe("createProduct", () => {
        test("should create product", async() => {
            const service = new CatalogService(repository);
            const requestBody = {
                name: "iPhone",
                description: "Smart Phone",
                price: 999,
                stock: 11,
                id: 101,
            }
            const result = await service.createProduct(requestBody);
            expect(result).toMatchObject({
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                id: expect.any(Number),
            });
        });

        test("should throw error with product already exists", () => {
            
        });
    });

    // clean up
    afterEach(() => {
        repository = {} as MockCatalogRespository;
    });
});