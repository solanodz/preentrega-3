import config from '../config/config.js';

export let ProductDao;

switch (config.persistence) {
    case 'mongodb':
        ProductDao = (await import('./product.mongodb.dao.js')).default;
        break;
    default:
        ProductDao = (await import('./product.memory.dao.js')).default;
}