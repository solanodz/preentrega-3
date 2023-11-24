import { Router } from "express";

const router = Router();

const privateRouter = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/sessions/login'); // Ruta absoluta
    }

    // Si el usuario no es admin y trata de acceder a /profile, redirigir a /sessions/login
    if (req.path === '/profile' && req.session.user.role !== 'admin') {
        return res.redirect('/sessions/login'); // Ruta absoluta
    }
    next();
};

const publicRouters = (req, res, next) => {
    if (req.session.user && req.path !== '/sessions/login') {
        return res.redirect('/sessions/products');
    }
    next();
}


router.get('/profile', privateRouter, (req, res) => {
    res.render('profile', { title: 'Perfil', user: req.session.user });
});

router.get('/sessions/login', publicRouters, (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/sessions/register', publicRouters, (req, res) => {
    res.render('register', { title: 'Register' });
});

router.get('/sessions/products', publicRouters, (req, res) => {
    res.render('products', { title: 'Products' })
})

export default router;
