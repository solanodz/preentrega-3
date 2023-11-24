import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    status: { type: Boolean, required: true }
}, { timestamps: true })

ProductsSchema.plugin(mongoosePaginate)

export default mongoose.model('Product', ProductsSchema);