import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { createHash, isValidPassword } from '../utils.js'
import UserModel from '../models/user.model.js'
import config from '../config/config.js'

const opts = {
    usernameField: 'email',
    passReqToCallback: true,
}

function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.access_token
    }
    return token;
}

export const init = () => {
    passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(new Error('User already registered'))
            }
            const newUser = await UserModel.create({
                ...req.body,
                password: createHash(password),
            });
            done(null, newUser)
        } catch (error) {
            done(new Error(`Ocurrio un error durante la autenticacion ${error.message}`))
        }
    }));

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return done(new Error('Correo o contraseña inválidos ⛔'))
        }
        const isPassValid = isValidPassword(password, user)
        if (!isPassValid) {
            return res.status(401).send('Correo o contraseña inválidos ⛔');
        }
        done(null, user)
    }));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([]),
        secretOrKey: config.jwtSecret,
    }, (payload, done) => {
        return done(null, payload)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid)
        done(null, user)
    })
}