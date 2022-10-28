const mongoose = require("mongoose");

// Schema Design 
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true, // for removing spaces 
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too Large"],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Unit value can't be {VALUE}, must be kg/litre/pcs"
        },
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: (value) => {
            const isInteger = Number.isInteger(value);
            if (isInteger) {
                return true
            } else {
                return false
            }
        },
        message: "Quantity must an Integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-stock", "discountinued"],
            message: "Status can't be {VALUE}"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier"
    // },
    // categories: [{
    //   name: {
    //     type: String,
    //     required: true,
    //   },
    //   _id: mongoose.Schema.Types.ObjectId,
    // }]
}, {
    timestams: true
})

// Mongoose Middlewares for saving data: pre / post 
productSchema.pre('save', function (next) {
    console.log("before saving data");
    if (this.quantity === 0) {
        this.status = "out-stock"
    }
    next();
});

// productSchema.post('save', function(doc, next){
//   console.log("after saving sata");
//   next();
// })

// SCHEMA => MODEL => QUERY

productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

const Product = mongoose.model("Product", productSchema);

module.exports = Product;