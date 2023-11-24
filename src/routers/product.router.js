import { Router } from 'express';
import ProductModel from '../models/product.model.js'

const router = Router();

router.get('/products', async (req, res) => {
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

            result = await ProductModel.paginate({ ...criteria }, opts);
            console.log("Result:", result);
        } else {
            result = await ProductModel.paginate(criteria, opts);
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

router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await ProductModel.findOne({ _id: pid });
    if (!products) {
        return res.status(404).json({ message: `⛔ Product with the id "${pid}" not found` });
    }
    res.status(200).json(products);
})

router.post('/products', async (req, res) => {
    try {
        const { body } = req;
        const products = await ProductModel.create(body);
        res.status(201).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.put('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const { body } = req;
    const result = await ProductModel.updateOne({ _id: pid }, { $set: body })
    res.status(204).end();
})

router.delete('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    await ProductModel.deleteOne({ _id: pid })
    res.status(204).end();
})

export default router;