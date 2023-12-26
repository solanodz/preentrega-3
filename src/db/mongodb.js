import mongoose from 'mongoose'
import config from '../config/config.js';

export const URI = config.mongodbUri;

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Base de datos conectada ✅');
    } catch (error) {
        console.error('Ha ocurrido un problema al tratar de acceder a la base de datos ⛔');
    }
}