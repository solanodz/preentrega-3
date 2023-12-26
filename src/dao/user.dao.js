import UserModel from "../models/user.model.js";

export default class UserDao {
    static create(data) {
        return UserModel.create(data);
    }

    static get(criteria = {}) {
        return UserModel.find(criteria)
    }

    static getById(uid) {
        const result = UserModel.findOne({ _id: uid }).exec()
        console.log(result);
        return result;
    }

    static updateById(uid, data) {
        return UserModel.updateOne({ _id: uid }, { $set: data })
    }

    static deleteById(uid) {
        return UserModel.deleteOne({ _id: uid })
    }
}