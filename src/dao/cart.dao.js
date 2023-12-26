import CartModel from '../models/cart.model.js';

export default class CartDao {

    static get(criteria = {}) {
        return CartModel.find(criteria);
    }
    async create(data) {
        return CartModel.create(data);
    }

    static updateById(cid, data) {
        if (data instanceof CartModel) {
            return CartModel.updateOne({ _id: cid }, data);
        }
        return CartModel.updateOne({ _id: cid }, { $set: data });
    }
}