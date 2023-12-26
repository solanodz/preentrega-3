import CartDao from "../dao/cart.dao.js";

export default class CartsService {
    constructor() {
        this.cartDao = new CartDao();
    }

    static getAll(filter = {}) {
        return CartDao.get(filter)
    }

    static async getById(cid) {
        return CartDao.getById(cid);
    }

    static async getOne(filter = {}) {
        const [cart] = await CartDao.get(filter);
        return cart;
    }

    static async create(data) {
        const cart = await CartDao.create(data);
        return cart;
    }

    static async updateById(cid, data) {
        return CartDao.updateById(cid, data);
    }

    static deleteById(cid) {
        return CartDao.deleteById(cid);
    }
}