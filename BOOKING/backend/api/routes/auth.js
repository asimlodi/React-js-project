import express from "express"
import { newRegister, newLogin } from "../controller/auth.js";

const router = express.Router()

//Register user
router.post('/register', newRegister);

//Login User
router.post('/login', newLogin);

export default router 