
export default {
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
    persistence: process.env.PERSISTENCE || 'memory',
    jwtSecret: process.env.JWT_SECRET,
}
