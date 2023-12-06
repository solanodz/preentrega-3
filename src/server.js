import http from 'http';

import app from './app.js';
import { init as initMongoDB } from './db/mongodb.js'

await initMongoDB();

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`🚀 Server is running in http://localhost:${PORT} 🚀`);
})