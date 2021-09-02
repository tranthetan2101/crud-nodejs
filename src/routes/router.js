const express = require("express");
const productRouter = require("./product.routes");
const categoryRouter = require("./category.routes")
const apiRoute = express();

apiRoute.use("/product", productRouter);
apiRoute.use("/category", categoryRouter);
module.exports =  apiRoute;