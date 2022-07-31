var express = require("express");
var router = express.Router();
const verifyUserMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/product.model");

/* GET home page. */
router.get("/", function (req, res) {
    Product.find({}, (err, products) => {
        if (err) {
            console.log(err);
            res.send("Error occured!");
        } else {
            res.send(products);
        }
    });
});
router.post("/", verifyUserMiddleware, async (req, res) => {
    const newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.amount = req.body.amount;

    try {
        const product = await newProduct.save();
        res.send(product);
    } catch (err) {
        console.log(err);
        res.send(err.errors.name.message);
    }
});
router.put("/:id", verifyUserMiddleware, async (req, res) => {
    const productID = req.params.id;
    const query = req.body.query;
    Product.findOneAndUpdate(
        { _id: productID },
        query,
        { new: true },
        (error) => {
            if (error) {
                console.log(error);
                res.send("Error occured");
            } else {
                res.send("Updated product information");
            }
        }
    );
});
router.delete("/:id", verifyUserMiddleware, (req, res) => {
    const productID = req.params.id;
    Product.findOneAndDelete({ _id: productID }, (err) => {
        if (err) {
            console.log(err);
            res.send("Error occured");
        } else {
            res.status(200).send("Deleted successful");
        }
    });
});

module.exports = router;
