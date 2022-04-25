const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
    order_id: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true },
    item_name: { type: String },
    cost: { type: Number },
    order_date: { type: String, default: Date }, 
    delivery_date: { type: String, default: Date }
});

module.exports = mongoose.model('api', apiSchema);