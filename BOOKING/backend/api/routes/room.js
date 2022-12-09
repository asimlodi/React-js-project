import express from "express"

import { createRoom, updateRoom, oneRoom, allRoom, deleteRoom } from "../controller/room.js"
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

//Create
router.post('/:hotelid', verifyAdmin, createRoom);

//Update 
router.put('/:id', verifyAdmin, updateRoom)

//Singe Hotel
router.get('/:id', oneRoom)

// All hotels
router.get('/', allRoom)

//Delete hotels
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom)

export default router

