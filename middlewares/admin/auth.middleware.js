const Account = require("../../models/account.model")
const systemConfig = require('../../config/system')
const requireAuth = async (req,res, next) => {
    const token = req.cookies.token
    if(!token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }else {
        const user = await Account.findOne({
            token : token,
            deleted: false,
        })
        if(!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }else {
            next()
        }
    }
}
module.exports = {
    requireAuth
}