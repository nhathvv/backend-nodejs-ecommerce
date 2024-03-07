const productRouter = require("./product.router")
const homeRouter = require("./home.router")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use("/", homeRouter)
  app.use("/products", productRouter)
}