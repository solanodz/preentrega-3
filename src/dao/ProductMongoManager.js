// Aca crearemos el CRUD con mongoose que reemplazara el FileSystem
import productModel from "../models/product.model";

export default class ProductMongoManager {
    static get(query = {}) {
        const criteria = {};
        if (query.products) {
            criteria.products = query.products;
        }
        return productModel.find(criteria);
    }

    static async getById(pid) {
        const product = await productModel.findById(pid);
        if (!product) {
            throw new Error(`⛔ No se encontro el producto con id ${pid}`);
        }
        return product;
    }

    static async create(data) {
        const product = await productModel.create(data);
        console.log('Producto creado correctamente ✅');
        return product;
    }

    static async updateById(pid, data) {
        const product = await productModel.findById(pid);
        if (!product) {
            throw new Error(`⛔ No se encontro el producto con id ${pid}`);
        }
        const criteria = { _id: pid };
        const operation = { $set: data };
        const result = await productModel.updateOne(criteria, operation); // Agregado 'await' aquí
        console.log('Producto actualizado correctamente ✅');
    }

    static async deleteById(pid) {
        const product = await productModel.findById(pid);
        if (!product) {
            throw new Error(`⛔ No se encontro el Producto con id ${pid}`);
        }
        await productModel.deleteOne({ _id: pid });
        console.log('Producto eliminado correctamente ✅');
    }
}
