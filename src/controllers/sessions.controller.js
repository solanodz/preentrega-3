import UsersService from '../services/user.service.js'

export default class SessionsController {

    static async create(data) {
        console.log('Creando nuevo usuario 🔃');
        const newUser = await UsersService.create(data);
        console.log('Usuario creado exitosamente ✅');
        return newUser
    }

    static async get(query = {}) {
        const users = await UsersService.findAll(query)
        return users
    }

    static async getById(uid) {
        const user = await UsersService.findById(uid)
        if (!user) {
            throw new Error(`Usuario no encontrado ⛔`)
        }
        return user;
    }

    static async findById(uid) {
        const user = await UsersService.getById(uid)
        if (!user) {
            throw new Error(`Usuario no encontrado ⛔`)
        }
        return user;
    }

    static async updateById(uid, data) {
        await SessionsController.getById(uid)
        await UsersService.updateById({ _id: uid }, { $set: data })
    }

    static async deleteById(uid) {
        await SessionsController.getById(uid)
        await UsersService.deleteById(uid)
    }

}