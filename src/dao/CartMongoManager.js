import CartModel from "../models/carts.model.js";

export default class CartMongoManager {
    //... aca van todos los demas metodos
    // esto de abajo es lo que me permitiria agregar el producto al carrito
    static async addProductToCart(cid, pid, quantity) {
        const cart = await CartModel.findById(cid);
        const index = cart.products.findIndex((product) => String(product._id) === pid)
        if (index == -1) {
            cart.products.push({ product: pid, quantity: quantity })
        } else {
            cart.products[index].quantity += quantity;

        }
        await CartModel.updateOne({ _id: cid }, cart)
    }

    static async deleteById(cid) {
        try {
            // Encontrar el carrito por su ID y eliminarlo
            const result = await CartModel.deleteOne({ _id: cid });
            if (result.deletedCount === 1) {
                return { success: true, message: `El carrito con ID ${cid} ha sido eliminado.` };
            } else {
                return { success: false, message: `El carrito con ID ${cid} no fue encontrado.` };
            }
        } catch (error) {
            return { success: false, message: `⛔ Error al eliminar el carrito: ${error.message}` };
        }
    }

}
