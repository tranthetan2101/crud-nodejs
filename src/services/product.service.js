
const productModel = require('../models/product.model');
const ProductsService = {};
ProductsService.getAllProduct = async ()=>{
    return productModel.aggregate([
        {
            $lookup:{
                from:"categories",
                localField: "category",
                foreignField: "_id",
                as:"category_info",
            },
        },
        {
            $unwind: "$category_info",
        },
    ]);
}
ProductsService.getProductById = async (req, res)=>{
    return productModel.findById(req.params.productId);
}
ProductsService.createProduct = async (req, res)=>{
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }
    let product = new productModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category:req.body.category
    });
    return product.save();
}
ProductsService.updateProduct = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    product = productModel.findByIdAndUpdate(req.params.productId, {
        name: req.body.name || "Untitled Note",
        price: req.body.price,
        description: req.body.description,
        category:req.body.category
    }, {new: true});

    return product;
};

ProductsService.deleteProduct = (req, res) => {
    return productModel.findByIdAndRemove(req.params.productId)
};
module.exports = ProductsService;