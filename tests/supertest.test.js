import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe('E-commerce tests', () => {
    describe('Product tests 🛍️', () => {

        it('Should create a product successfully 🆕', async function () {
            try {
                const productMock = {
                    title: 'Product test',
                    description: 'Product test description',
                    code: '4i5jh34',
                    price: 1500,
                    stock: 10,
                    category: 'Category',
                    thumbnail: 'thumbnail of product test',
                    status: true
                };
                const {
                    statusCode,
                    ok,
                    _body
                } = await requester.post('/api/products').send(productMock);
                expect(statusCode).to.be.equals(200);
                expect(ok).to.be.ok;
                expect(_body).to.be.has.property('payload');
                expect(_body.payload).to.be.has.property('_id');
            } catch (error) {
                console.error(error);
            }
        });

        it('Should response with an error 400 when name is missing ⚠️', async function () {
            try {
                const productMock = {
                    // title: 'Product test',
                    description: 'Product test description',
                    code: '4i5jh34',
                    price: 1500,
                    stock: 10,
                    category: 'Category',
                    thumbnail: 'thumbnail of product test',
                    status: true
                };
                const {
                    statusCode,
                    ok,
                    _body
                } = await requester.post('/api/products').send(productMock);
                expect(statusCode).to.be.equals(400);
                expect(ok).to.be.not.ok;
                expect(_body).to.be.has.property('status', 'error');
                expect(_body.error).to.be.equals('error', 'Incomplete values');
            } catch (error) {
                console.error(error);
            }
        });

        it('Should response with products correctly ✅', async function () {
            try {
                const {
                    statusCode,
                    ok,
                    _body
                } = await requester.get('/api/products');
                expect(statusCode).to.be.equals(200);
                expect(ok).to.be.ok;
                expect(_body).to.be.has.property('payload');
                expect(_body.payload).to.be.an('array');
            } catch (error) {
                console.error(error);
            }
        });
    });

    describe('Cart tests 🛒', () => {
        it('Should create a cart successfully 🆕', async function () {
            try {
                const cartMock = {
                    products: [
                        {
                            productId: '60e7d3b4c0c7c6a4c8b9d0f8',
                            quantity: 2
                        },
                        {
                            productId: '60e7d3b4c0c7c6a4c8b9d0f9',
                            quantity: 1
                        }
                    ],
                    total: 3200
                };
                const {
                    statusCode,
                    ok,
                    _body
                } = await requester.post('/api/carts').send(cartMock);
                expect(statusCode).to.be.equals(200);
                expect(ok).to.be.ok;
                expect(_body).to.be.has.property('payload');
                expect(_body.payload).to.be.has.property('_id');
            } catch (error) {
                console.error(error);
            }
        });

        it('Should response with an error 400 when products are missing ⚠️', async function () {
            try {
                const cartMock = {
                    // products: [
                    //     {
                    //         productId: '60e7d3b4c0c7c6a4c8b9d0f8',
                    //         quantity: 2
                    //     },
                    //     {
                    //         productId: '60e7d3b4c0c7c6a4c8b9d0f9',
                    //         quantity: 1
                    //     }
                    // ],
                    total: 3200
                };
                const {
                    statusCode,
                    ok,
                    _body
                } = await requester.post('/api/carts').send(cartMock);
                expect(statusCode).to.be.equals(400);
                expect(ok).to.be.not.ok;
                expect(_body).to.be.has.property('status', 'error');
                expect(_body.error).to.be.equals('error', 'Incomplete values');
            } catch (error) {
                console.error(error);
            }
        });

        it('Should response with carts correctly ✅', async function () {
            try {
                const {
                    statusCode,
                    ok,
                    _body
                } = await requester.get('/api/carts');
                expect(statusCode).to.be.equals(200);
                expect(ok).to.be
            } catch (error) {
                console.error(error);
            }
        })
    })

    describe('User tests 👤', () => {
        let cookie;
        let email;
        it('Should create a user successfully 🆕', async function () {
            email = `solanodz${Date.now()}@gmail.com`
            const userMock = {
                first_name: 'Solano',
                last_name: 'de Zuasnabar',
                email,
                age: 23,
                password: 'qwerty',
                role: 'admin',
            }
            const {
                statusCode,
                ok,
                _body
            } = await requester.post('/sessions/register').send(userMock);
            expect(statusCode).to.be.equals(200);
            expect(ok).to.be.ok;
            expect(_body).to.be.has.property('payload');
        })

        it.only('Should login a user successfully 🔑', async function () {
            const credentialsMock = {
                email,
                password: 'qwerty'
            }
            const {
                headers,
                statusCode,
                ok,
                _body
            } = await requester.post('/sessions/login').send(credentialsMock);
            expect(statusCode).to.be.equals(200);
            expect(ok).to.be.ok;
            expect(_body).to.be.has.property('status', 'success');
            expect(_body).to.be.has.property('message', 'Logged in');
            const [key, value] = headers['set-cookie'][0].split('=');
            cookie = { key, value };
        })
    })
})