const ProductsService = require('../services/product.service');
const productController = {};
productController.index = async (req, res) => {
  try {
    await ProductsService.getAllProduct().then(response =>{
        res.status(200).json({
          success: true,
          message: "get all product successfully",
          products: response,
        })
      })
  } catch (error) {
      res.status(500).send({
        message: error.message || "Something wrong while retrieving products."
    });
  }
};

productController.show = async(req,res)=>{
  await ProductsService.getProductById(req,res).then(response =>{
    res.status(200).json({
      success :true,
      message:`get thanh cong san pham co id : ${req.params.productId}`,
      product: response
    })
  }).catch(error =>{
      if(error.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
      });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
    });
  })
}

productController.store = async (req,res)=>{
    await ProductsService.createProduct(req,res).then(response =>{
      res.status(201).json({
          success: true,
          message: "create product successfully",
          product: response,
      })
    }).catch(error =>{
        res.status(500).send({
            message: error.message || "Something wrong while creating the product."
        });
    })
}

productController.update = async (req,res)=>{
  await ProductsService.updateProduct(req, res).then(product =>{
    if(!product) {
      return res.status(404).send({
          message: "product not found with id " + req.params.productId
      });
  }
    res.status(201).json({
        success: true,
        message: `update thành công ${req.params.productId}`,
        product: product,
    })
  }).catch(error =>{
      if(error.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
        });                
      }
      return res.status(500).send({
          message: "Error updating note with id " + req.params.noteId
      });
    })
}

productController.delete = async (req,res) =>{
  await ProductsService.deleteProduct(req,res).then(response =>{
    if(!response) {
      return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
      });
    }
    res.send({message: `xóa thành công sản phẩm có id : ${req.params.productId}`});
  })
}
module.exports = productController;