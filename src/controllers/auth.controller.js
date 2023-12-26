import UserService from "../services/user.service.js";
import { createHash } from '../utils.js';

export default class AuthController {

    static async register(data) {
        const {
            first_name,
            last_name,
            email,
            age,
            password,
            role,
        } = data
        if (
            !first_name ||
            !last_name ||
            !email ||
            !age ||
            !password ||
            !role
        ) {
            throw new Error('Todos los campos son requeridos!')
        }
        let user = await UserService.getOne({ email })
        if (user) {
            throw new Error('Este email ya esta registrado')
        }
        user = await UserService.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role
        })
        return user
    }
}