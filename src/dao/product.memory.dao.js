export default class ProductDao {
    constructor() {
        this.products = [
            {
                id: 1,
                title: 'prod prueba',
                description: 'pruebapruebaprueba',
                code: 'prueba123',
                price: 10,
                stock: 10,
                category: 'ropa',
                thumbnail: 'prueba',
                status: true,
            }
        ]
    }

    get(filter = {}) {
        return this.products
    }

    create(data) {
        const newProduct = {
            ...data,
            id: this.contact.length + 1
        }
        this.contact.push(newProduct)
        return Promise.resolve(newProduct);
    }

    updateById(pid) {
        const index = this.products.findIndex(p => p.id === parseInt(id))
        this.products[index] = {
            ...this.products[index],
            ...data,
            id: parseInt(id)
        }
        return Promise.resolve(this.products[index])
    }

    deleteById(id) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        const result = this.products.splice(index, 1);
        return Promise.resolve(result[0]);
    }

}