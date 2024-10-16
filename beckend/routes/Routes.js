const express = require("express")
const {userdata,alluserdata} = require("../controller/Usercontroller")
const router = express.Router();

router.route("/").get(userdata)
router.route("/alldata").get(alluserdata)

module.exports = router