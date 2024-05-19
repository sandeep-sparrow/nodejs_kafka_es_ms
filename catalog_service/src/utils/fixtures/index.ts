import { Factory } from 'rosie'; // factory for generating random Array's of Data
import { faker } from "@faker-js/faker";
import { Product } from "../../models/product.model";

export const ProductFactory = new Factory<Product>()
    .attr("id", faker.number.int({min: 1, max: 1000}))
    .attr("description", faker.commerce.productDescription())
    .attr("name", faker.commerce.productName())
    .attr("stock", faker.number.int({ min: 10, max: 100}))
    .attr("price", +faker.commerce.price());