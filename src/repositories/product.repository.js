import ProductDTO from "../dto/product.dto.js"

export default class Product {
    constructor(dao) {
        this.dao = dao
    }

    async get(filter = {}) {
        const products = await this.dao.get(filter);
        return products.map(product => new ProductDTO(product));
    }

    async getById(id) {
        const product = await this.dao.getById(id);
        return new ProductDTO(product);
    }
    async create(data) {
        const newProduct = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            category: data.category,
            thumbnail: data.thumbnail,
            status: data.status
        }

        const product = await this.dao.create(newProduct)
        return new ProductDTO(product)
    }

    updateById(id, data) {
        const newProduct = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            category: data.category,
            thumbnail: data.thumbnail,
            status: data.status
        }
        return this.dao.updateById(id, newProduct)
    }

    deleteById(id) {
        return this.dao.deleteById(id)
    }
}