import { Router } from 'express'

import UserModel from '../models/user.model.js'

const router = Router()

router.post('/register', async (req, res) => {
    const { body } = req;
    body.role = 'usuario'; // los registros que sea crean son 'usuarios' por defect, no 'admin'
    const newUser = await UserModel.create(body);
    console.log('New User', newUser);
    console.log('Registro exitoso. Redirigiendo a /sessions/login');
    res.redirect('/sessions/login');
})

// sessions.router.js
router.post('/login', async (req, res) => {
    const { body: { email, password } } = req;

    // Verificar si es el administrador
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        // Si es el administrador, asignar el rol correspondiente
        req.session.user = { email, role: 'admin' };
        console.log('Inicio de sesión exitoso. Redirigiendo a /profile');
        return res.redirect('/profile');
    }

    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(401).send('Correo o contraseña inválidos ⛔');
    }

    const { first_name, last_name, role } = user;
    req.session.user = { first_name, last_name, email, role };
    res.redirect('/products');
});


router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/sessions/login')
    });
})

export default router;