import { Router } from "express";
import UserModel from "../models/user.model.js";
import {
    createHash,
    isValidPassword,
    tokenGenerator,
    jwtAuth,
    verifyToken
} from "../utils.js";
import passport from 'passport'

const router = Router();

const privateRouter = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/sessions/login'); // Ruta absoluta
    }

    // Si el usuario no es admin y trata de acceder a /profile, redirigir a /sessions/login
    if (req.path === '/profile' && req.session.user.role !== 'admin') {
        return res.redirect('/sessions/login'); // Ruta absoluta
    }

    // Si el correo es 'adminCoder@coder.com', redirigir a /profile
    if (req.session.user.email === 'adminCoder@coder.com') {
        return res.redirect('/profile'); // Ruta absoluta
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

router.post('/sessions/login', publicRouters, async (req, res) => {
    const { body: { email, password } } = req;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Correo o contraseña invalidos.' });
    }

    const isPassValid = isValidPassword(password, user);

    if (!isPassValid) {
        return res.status(401).json({ message: 'Correo o contraseña invalidos.' });
    }

    const token = tokenGenerator(user);

    res.cookie('access_token', token, {
        maxAge: 60000,
        httpOnly: true
    });

    if (user.role === 'admin') {
        return res.redirect('/profile');
    } else if (user.role === 'usuario') {
        return res.redirect('/products');
    } else {
        // Otro caso, puedes manejarlo según tus necesidades
        return res.status(403).json({ message: 'Acceso no autorizado.' });
    }
});


router.get('/sessions/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user)
})

router.get('/sessions/register', publicRouters, (req, res) => {
    res.render('register', { title: 'Register' });
});

router.get('/sessions/products', publicRouters, (req, res) => {
    res.render('products', { title: 'Products' })
})

export default router;
