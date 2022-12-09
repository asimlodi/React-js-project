import express from "express"
import { createHotel, updateHotel, oneHotel, 
    allHotels, deleteHotels, countByCity, countByType, getHotelRooms} from "../controller/hotel.js"
import { createError } from "../utils/error.js"
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router()


//Create
router.post('/', verifyAdmin,createHotel);

//Update 
router.put('/:id', verifyAdmin, updateHotel)

//Singe Hotel
router.get('/find/:id', oneHotel)

// All hotels
router.get('/', allHotels)

router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRooms)


//Delete hotels
router.delete('/:id',verifyAdmin, deleteHotels)

export default router