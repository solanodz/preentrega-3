import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js'

const router = Router();

router.get('/products', async (req, res, next) => {
    try {
        const products = await ProductsController.get(req.query)
        res.status(200).json(products)
    } catch (error) {
        console.log('Ocurrio un error durante la busqueda de los productos ⛔');
        next(error)
    }


    /* 
    const { page = 1, limit = 10, sort, query } = req.query;
    const opts = { page, limit };
    const criteria = {};

    try {
        let result;
        // buscar por categoria
        if (query) {
            const lowerCaseQuery = query.toLowerCase();

            if (['electronica', 'ropa', 'hogar'].includes(lowerCaseQuery)) {
                criteria.category = lowerCaseQuery;
            }

            result = await productModel.paginate({ ...criteria }, opts);
            console.log("Result:", result);
        } else {
            result = await productModel.paginate(criteria, opts);
            console.log("Result:", result);
        }
        // Ordenar por precio
        if (sort === 'asc') {
            result.docs.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            result.docs.sort((a, b) => b.price - a.price);
        }

        res.render('products', buildResponse(result, sort));
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Error en la solicitud.' });
    }
    */
});

const buildResponse = (data, sort = '') => {
    const baseLink = `http://localhost:8080/api/products?limit=${data.limit}&page=`;
    const sortParam = sort === 'asc' ? '&sort=asc' : sort === 'desc' ? '&sort=desc' : '';

    return {
        status: 'success',
        payload: data.docs.map(product => product.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `${baseLink}${data.prevPage}${sortParam}` : '',
        nextLink: data.hasNextPage ? `${baseLink}${data.nextPage}${sortParam}` : '',
    };
}

router.get('/products/:pid', async (req, res, next) => {
    try {
        const { params: { pid } } = req;
        const product = await ProductsController.findById(pid)
        res.status(201).render(product)
        if (!product) {
            res.status(404).json({ message: 'El producto solicitado no existe' })
        }
    } catch (error) {
        console.log(`Ha ocurrido un error durante la busqueda del producto ⛔`);
        next(error)
    }
})

router.post('/products', async (req, res, next) => {
    try {
        const { body } = req;
        const newProduct = await ProductsController.create(body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.log('Ocurrio un error durante la creación del producto ⛔');
        next(error)
    }
})

router.put('/products/:pid', async (req, res, next) => {
    try {
        const { params: { pid }, body } = req;
        const result = await ProductsController.updateById(pid, body)
        res.status(204).end()
    } catch (error) {
        console.log(`Ha ocurrido un error durante la actualización del producto ⛔`);
        next(error)
    }
})

router.delete('/products/:pid', async (req, res, next) => {
    try {
        const { params: { pid } } = req;
        console.log('pid:', pid);
        await ProductsController.deleteById(pid);

        res.status(204).end();
    } catch (error) {
        console.log(`Ha ocurrido un error durante la eliminación del producto ⛔`);
        next(error);
    }
});


export default router;