export default class ProductDTO {
    constructor(product) {
        this.id = product.id || product._id
        this.title = product.title
        this.description = product.description
        this.code = product.code
        this.price = product.price
        this.stock = product.stock
        this.category = product.category
        this.thumbnail = product.thumbnail
        this.status = product.status
    }
}