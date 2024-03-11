const productRouter = require("./product.router")
const homeRouter = require("./home.router")
const searchRouter = require("./search.router")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use("/", homeRouter)
  app.use("/products", productRouter)
  app.use("/search", searchRouter)
}