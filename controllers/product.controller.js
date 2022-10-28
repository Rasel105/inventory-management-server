exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product.find({ name: { $in: ["Chal", "Dall"] } });
        // const products = await Product
        // .where("name").equals(/\w/)
        // .where("quantity").gt(100)
        // .limit(2)

        const product = 

            res.status(200).json({
                status: "Success",
                data: product,
            })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get data",
            error: error.message
        })
    }
};

exports.createPruduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);

        // Save and create 

        const result = await product.save();

        result.logger();

        // const result = await Product.create(req.body);

        res.status(200).json({
            status: "Success",
            message: "Data inserted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not inserted",
            error: error.message,
        })
    }
};