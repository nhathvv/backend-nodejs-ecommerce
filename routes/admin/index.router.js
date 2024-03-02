const dashboardRouter = require("./dashboard.router")
const productRouter = require("./product.router")
const productCatelogyRouter = require("./products-category.router")
const roleRouter = require("./role.router")
const systemConfig = require("../../config/system")
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin
  app.use(PATH_ADMIN+"/dashboard", dashboardRouter)
  app.use(PATH_ADMIN+"/products", productRouter)
  app.use(PATH_ADMIN+"/products-category", productCatelogyRouter)
  app.use(PATH_ADMIN+"/roles", roleRouter)

}