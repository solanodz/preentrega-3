import mongoose from 'mongoose'

export const URI = 'mongodb+srv://solanodz:9CTacOfBypakyJx3@cluster0.w0s099h.mongodb.net/desafio-login';

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Base de datos conectada ✅');
    } catch (error) {
        console.error('Ha ocurrido un problema al tratar de acceder a la base de datos ⛔');
    }
}