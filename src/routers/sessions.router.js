import { Router } from 'express'
import SessionsController from '../controllers/sessions.controller.js'
import AuthController from '../controllers/auth.controller.js'
import passport from 'passport'

const router = Router()

/* router.post('/register', async (req, res) => {
    const { body } = req;
    body.role = 'usuario'; // los registros que sea crean son 'usuarios' por defect, no 'admin'
    const newUser = await UserModel.create({
        ...body,
        password: createHash(body.password)
    });
    console.log('New User', newUser);
    console.log('Registro exitoso. Redirigiendo a /sessions/login');
    res.redirect('/sessions/login');
}) */

router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    // res.redirect('/sessions/login')
    try {
        const user = await AuthController.register(req.body)
        res.status(201).json({ message: 'Usuario creado exitosamente', user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// sessions.router.js
/* router.post('/login', async (req, res) => {
    const { body: { email, password } } = req;

    // Verificar si es el administrador
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        // Si es el administrador, asignar el rol correspondiente
        req.session.user = { email, role: 'admin' };
        console.log('Inicio de sesión exitoso. Redirigiendo a /profile');
        return res.redirect('/profile');
    }

    const user = await UserModel.findOne({ email });

    const { first_name, last_name, role } = user;
    req.session.user = { first_name, last_name, email, role };
    res.redirect('/products');
});
 */

router.get('/users', async (req, res, next) => {
    try {
        const users = await SessionsController.get(req.query)
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

router.get('/users/:uid', async (req, res, next) => {
    try {
        const { params: { uid } } = req;
        const user = await SessionsController.findById(uid)
        res.status(201).json(user)
        if (!user) {
            res.status(404).json({ message: 'El usuario solicitado no existe' })
        }
    } catch (error) {
        next(error)
    }
})


router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    const { email } = req.user; // Utilizando req.user después de autenticar

    // Consultando la base de datos para obtener el usuario
    const user = await SessionsController.findById({ email });

    // Almacenando el rol en req.session.user
    req.session.user = { email, role: user.role };

    if (user.role === 'usuario') {
        res.redirect('/sessions/products');
    } else if (user.role === 'admin') {
        console.log('Inicio de sesión exitoso. Redirigiendo a /profile');
        return res.redirect('/profile');
    } else {
        // Otro caso, puedes manejarlo según tus necesidades
        res.status(403).json({ message: 'Acceso no autorizado.' });
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/sessions/login')
    });
})

router.delete('/users/:uid', async (req, res, next) => {
    try {
        const { params: { uid } } = req;
        await SessionsController.deleteById({ _id: uid })
    } catch (error) {
        next(error)
    }
})

export default router;