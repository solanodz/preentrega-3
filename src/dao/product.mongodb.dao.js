import ProductModel from '../models/product.model.js';

export default class ProductDao {
    get(filter = {}) {
        const criteria = {};
        if (filter.pid) {
            criteria._id = filter.pid;
        }
        return ProductModel.find(criteria);
    }

    getById(pid) {
        return ProductModel.findOne({ _id: pid });
    }

    create(data) {
        return ProductModel.create(data);
    }

    updateById(pid, data) {
        return ProductModel.updateOne({ _id: pid }, { $set: data });
    }

    deleteById(pid) {
        return ProductModel.deleteOne({ _id: pid });
    }
}
