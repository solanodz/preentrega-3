import { productRepository } from "../repositories/index.js";

export default class ProductsService {
    static findAll(filter = {}) {
        return productRepository.get(filter);
    }

    static async create(payload) {
        return productRepository.create(payload);
    }

    static getById(pid) {
        return productRepository.getById(pid);
    }

    static updateById(pid, data) {
        return productRepository.updateById(pid, data);
    }

    static deleteById(pid) {
        return productRepository.deleteById(pid);
    }
}