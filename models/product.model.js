const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
        validatePrice: {
            validator: function (v) {
                return v > 0;
            },
            message: (props) => `${props.value} is not a valid price!`,
        },
    },
    amount: {
        required: true,
        type: Number,
        min: [0, "Amount must be greater than or equal to 0!"],
    },
});

module.exports = mongoose.model("product", productSchema);
