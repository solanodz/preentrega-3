import ProductsService from '../services/products.service.js';

export default class ProductsController {

    static async create(data) {
        console.log('Creando nuevo producto 🔃');
        const newProduct = await ProductsService.create(data);
        console.log('Producto creado exitosamente ✅');
        return newProduct;
    }

    static async get(query = {}) {
        const filter = {
            title: query.title,
        }
        const products = await ProductsService.findAll(filter)
        return products
    }

    static async findById(pid) {
        const product = await ProductsService.getById(pid)
        if (!product) {
            throw new Error(`Producto no encontrado ⛔`)
        }
        return product
    }

    static async updateById(pid, data) {
        await ProductsController.findById(pid)
        await ProductsService.updateById({ _id: pid }, { $set: data })
    }

    static async deleteById(pid) {
        await ProductsController.findById(pid)
        await ProductsService.deleteById(pid)
    }

}