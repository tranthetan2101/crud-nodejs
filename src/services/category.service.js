const categoryModel = require('../models/category.model');
const CategoryService = {};
CategoryService.getAll = async ()=>{
    return categoryModel.find();
}
CategoryService.createCategory = async (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message:"không đuoc để trống"
        })
    }
    let category = new categoryModel({
        name:req.body.name
    })
    return category.save();
}
module.exports = CategoryService;