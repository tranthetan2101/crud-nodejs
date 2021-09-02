const CategoryService = require('../services/category.service');
const categoryController = {};

categoryController.index = async (req,res) =>{
    await CategoryService.getAll().then(category =>{
        res.status(200).json({category: category})
    }).catch(error =>{
        res.status(500).send({
            message: error.message || "Something wrong while creating the product."
        });
    })
}

categoryController.store = async (req,res)=>{
    await CategoryService.createCategory(req,res).then(response =>{
      res.status(201).json({
          success: true,
          message: "create category successfully",
          category: response,
      })
    }).catch(error =>{
        res.status(500).send({
            message: error.message || "Something wrong while creating the product."
        });
    })
}

module.exports = categoryController;