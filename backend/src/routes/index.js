const express = require('express');
const Registration = require('./User-routes/Registration');
const home = require('./Home-route/home');
const Login = require('./User-routes/Login');
const input = require("./Task-routes/InputTask")
const EditTask = require("./Task-routes/EditTask")
const getAllTheTask = require("./Task-routes/GetAllTheTask")
const DeleteTask = require("./Task-routes/DeleteTask")
const error = require("./Home-route/Error")
const MarkTask = require("./Task-routes/MarkTask")

const router = express.Router();

router.use('/', home);
router.use('/registration', Registration);
router.use('/login', Login);
router.use("/input", input)
router.use("/EditTask", EditTask)
router.use("/getAllTheTask", getAllTheTask)
router.use("/DeleteTask", DeleteTask)
router.use("/MarkTask", MarkTask)

router.use("*",error)


module.exports = router;
