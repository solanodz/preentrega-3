import CartDao from "../dao/cart.dao.js";

export default class CartsService {
    constructor() {
        this.cartDao = new CartDao();
    }

    static getAllCartsS(filter = {}) {
        return CartDao.getCarts(filter)
    }

    static async getCartByIdS(cid) {
        return CartDao.getCartById(cid);
    }

    static async getOneCartS(filter = {}) {
        const [cart] = await CartDao.getOneCart(filter);
        return cart;
    }

    static async createCartS(data) {
        const cart = await CartDao.createCart(data);
        return cart;
    }

    static async updateCartByIdS(cid, data) {
        return CartDao.updateCartById(cid, data);
    }

    static deleteCartByIdS(cid) {
        return CartDao.deleteCartById(cid);
    }
}