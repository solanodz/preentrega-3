import CartsService from "../services/carts.service.js";
import ProductsService from "../services/products.service.js";


export default class CartController {

    static async getCart(cid) {
        const cart = await CartsService.getOne({ cid })
        if (!cart) {
            throw new Error('Cart not found')
        }
        return cart;
    }

    static async addNewCart(pid, quantity) {
        const cart = await CartsService.create(pid, quantity)
        return cart;
    }

    static async addProduct(cid, pid, quantity) {
        const cart = await CartsService.getOne({ cid })
        if (!cart) {
            throw new Error('Cart not found')
        }
        const product = await ProductsService.getOne({ pid })
        if (!product.stock > 0) {
            throw new Error('Product out of stock')
        }
        const index = cart.products.findIndex(item => String(item.product) === pid)
        if (index !== -1) {
            cart.products[index].quantity += quantity
        } else {
            cart.product.push({
                product: pid,
                quantity
            })
        }
        await CartService.updateById(cid, cart)
        return cart;
    }

    static async deleteCart(cid) {
        const cart = await CartsService.getOne({ cid })
        if (!cart) {
            throw new Error('Cart not found')
        }
        await CartsService.deleteById(cid)
        return cart;
    }

    static async updateCart(cid, products) {
        const cart = await CartsService.getOne({ cid })
        if (!cart) {
            throw new Error('Cart not found')
        }
        cart.products = products
        await CartsService.updateById(cid, cart)
        return cart;
    }

    static async updateProduct(cid, pid, quantity) {
        const cart = await CartsService.getOne({ cid })
        if (!cart) {
            throw new Error('Cart not found')
        }
        const index = cart.products.findIndex(item => String(item.product) === pid)
        if (index !== -1) {
            cart.products[index].quantity = quantity
        }
        await CartsService.updateById(cid, cart)
        return cart;
    }

    static async getProducts(cid) {
        const cart = await CartsService.getOne({ cid })
        if (!cart) {
            throw new Error('Cart not found')
        }
        return cart.products;
    }

    static async deleteProduct(cid, pid) {
        const cart = await CartsService.getOne({ cid })
        if (!cart) {
            throw new Error('Cart not found')
        }
        const index = cart.products.findIndex(item => String(item.product) === pid)
        if (index !== -1) {
            cart.products.splice(index, 1)
        }
        await CartsService.updateById(cid, cart)
        return cart;
    }
}