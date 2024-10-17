const express = require("express")
const {userdata,alldbdata,deletedata,updatedata} = require("../controller/Usercontroller")
const router = express.Router();

router.route("/data").post(userdata)
router.route("/alldata").get(alldbdata)
router.route("/delete/:id").delete(deletedata)
router.route("/update/:id").put(updatedata)
module.exports = router