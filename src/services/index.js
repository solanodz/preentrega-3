import CartManager from "../dao/cart.dao.js";
import CartService from "./carts.service.js";

import ProductManager from "../dao/product.mongodb.dao.js";
import ProductService from "./products.service.js";

import UserManager from "../dao/user.dao.js";
import UserService from "./user.service.js";

import TicketManager from "../dao/tickets.js";
import TicketService from "./ticket.service.js";

export const userService = new UserService(new UserManager());
export const productService = new ProductService(new ProductManager());
export const cartService = new CartService(new CartManager());
export const ticketsService = new TicketService(new TicketManager());