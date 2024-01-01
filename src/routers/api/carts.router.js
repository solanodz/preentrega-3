import { Router } from 'express'
import CartModel from '../../models/carts.model.js'
import CartMongoManager from '../../dao/CartMongoManager.js';

const router = Router();

// Obtener un carrito por su ID
router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await CartMongoManager.getCartsById(cid, true);
    if (!cart) {
        return res.status(404).json({ message: `⛔ Cart with the id "${cid}" not found` });
    }
    res.status(201).json(cart.products);
})
// Crear carrito nuevo
router.post('/carts', async (req, res) => {
    let result = await CartMongoManager.addNewCart({})
    res.status(201).json(result)
})

// Agregar un producto a un carrito específico
router.post('/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await CartMongoManager.addProductToCart(cid, pid, quantity);

        // No es necesario buscar el carrito nuevamente después de llamar a addProductToCart

        res.status(201).json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'No se pudo agregar el producto al carrito', error: error.message });
    }
});

// Editar un producto en un carrito específico
router.put('/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (isNaN(quantity)) {
        res.status(400).sendStatus(`⛔ "Quantity" must be a number!`)
        return
    }

    try {
        const cart = await CartMongoManager.addProductToCart(cid, pid, quantity);
        res.status(201).json({ message: '✅ Product updated Successfully', cart });
    } catch (error) {
        res.status(error.statusCode || 500).send({ error: error.message });
    }
});

// Eliminar un producto de un carrito específico
router.delete('/carts/:cid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await CartModel.findOne({ _id: cid });
        if (!cart) {
            return res.status(404).json({ message: `⛔ Cart with the id "${cid}" not found` });
        }
        if (pid < 0 || pid >= cart.products.length) {
            return res.status(404).json({ message: 'Índice de producto no válido' });
        }
        // Eliminar el producto del carrito
        cart.products.splice(pid, 1);
        await cart.save();
        res.status(200).json({ message: 'Producto eliminado del carrito exitosamente', cart });
    } catch (error) {
        res.status(400).json({ message: 'No se pudo eliminar el producto del carrito', error: error.message });
    }
});

router.put('/carts/:cid', async (req, res) => {
    const { cid } = req.params

    if (!Array.isArray(req.body)) {
        res.status(400).send('Body must be an array.')
        return
    }
    try {
        const newProducts = []
        for (const e of req.body) {
            if (isNaN(e.quantity)) {
                e.quantity = 1
            }
            if (!await ProductMongoManager.productExists(e.product)) {
                throw new error(`The product with id "${e.product}" doesn't exist.`, 404)
            }
            newProducts.push({ ...e })
        }
        let result = await CartMongoManager.updateCart(cid, newProducts)
        res.status(201).json(result)
    }
    catch (error) {
        res.status(error.statusCode || 500).send(error.message)
    }
})

router.delete('/carts/:cid/products:/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await CartMongoManager.deleteFromCart(cid, pid);
        res.status(201).send(`The product with the id "${pid}" in the cart with the id "${cid}" was deleted succesfully`)
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message)
    }
});


export default router;