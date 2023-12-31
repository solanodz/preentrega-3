import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from './models/user.model.js';
import config from './config/config.js';

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export default class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
}

const JWT_SECRET = config.jwtSecret;

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}

export const tokenGenerator = (user) => {
    const { _id, first_name, last_name, email, role } = user;
    const payload = {
        id: _id,
        first_name,
        last_name,
        email,
        role
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });
}

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (error, payload) => {
            if (error) {
                return reject(error)
            }
            resolve(payload)
        })
    })
}

export const jwtAuth = (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    jwt.verify(token, JWT_SECRET, async (error, payload) => {
        if (error) {
            return res.status(403).json({ message: 'Not authorized' })
        }
        req.user = await UserModel.findById(payload.id);
        next();
    })
}