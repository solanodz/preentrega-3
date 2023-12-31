import CartModel from '../models/cart.model.js';

export default class CartDao {

    static getCarts(criteria = {}) {
        return CartModel.find(criteria);
    }

    static getCartById(cid) {
        return CartModel.findById(cid);
    }

    static getOneCart(criteria = {}) {
        return CartModel.find(criteria);
    }

    async createCart(data) {
        return CartModel.create(data);
    }

    static updateCartById(cid, data) {
        if (data instanceof CartModel) {
            return CartModel.updateOne({ _id: cid }, data);
        }
        return CartModel.updateOne({ _id: cid }, { $set: data });
    }

    static deleteCartById(cid) {
        return CartModel.deleteOne({ _id: cid });
    }
}