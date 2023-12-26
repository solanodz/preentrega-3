import UserDao from '../dao/user.dao.js'

export default class UsersService {
    static findAll(filter = {}) {
        return UserDao.get(filter)
    }

    static async getOne(filter = {}) {
        const [user] = await UserDao.get(filter)
        return user

    }

    static async create(payload) {
        console.log('Creando un nuevo usuario 🔃');
        const user = await UserDao.create(payload)
        console.log(`Usuario con el id "${user._id}" creado correctamente ✅`);
        return user;
    }

    static async findById(uid) {
        return UserDao.getById(uid)
    }

    static updateById(uid, payload) {
        return UserDao.updateById(uid, payload)
    }

    static deleteById(uid) {
        return UserDao.deleteById(uid)
    }
}