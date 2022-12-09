import express from "express"
const router = express.Router()

import { allUser, deleteUser, oneUser, updateUser } from "../controller/user.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("you are success token login")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("you are success token login with asim khan")
// })

// router.get("/checkuseradmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("you are success token login with asim khan delete all acount")
// })

//Update 
router.put('/:id', verifyUser, updateUser)

//Singe Hotel
router.get('/:id', verifyUser,oneUser)

// All hotels
router.get('/', verifyAdmin, allUser)

//Delete hotels
router.delete('/:id',verifyUser, deleteUser)



export default router