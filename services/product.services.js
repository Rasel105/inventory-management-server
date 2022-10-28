const Product = require("../models/Product");

exports.getPruductService = async () => {
    const products = await Product.find({});
}