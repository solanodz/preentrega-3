import ProductRepository from "./product.repository.js"
import { ProductDao } from '../dao/factory.js'


export const productRepository = new ProductRepository(new ProductDao())