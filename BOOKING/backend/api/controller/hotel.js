import Hotel from "../models/hotel.js"
import Room  from "../models/room.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
       const saveHotel = await newHotel.save()
       res.status(200).json(saveHotel)
    } catch (error) {
       res.status(500).json(error)
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set : req.body }, { new : true })
        res.status(200).json(updateHotel)
     } catch (error) {
        res.status(500).json(error)
     }
}
export const oneHotel = async (req, res, next) => {
    try {
        const singleHotel = await Hotel.findById(req.params.id)
        res.status(200).json(singleHotel)
     } catch (error) {
        res.status(500).json(error)
     }
}
export const allHotels = async (req, res, next) => {
   const { min, max, ...others } = req.query
    try {
        const allHotel = await Hotel.find({ ...others,
         cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit)
        res.status(200).json(allHotel)
     } catch (err) {
        next(err)
     }
}
export const countByCity = async (req, res, next) => {
 const cities = req.query.cities.split(",")
   
    try {
        const list = await Promise.all(cities.map(city => {
         return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
     } catch (err) {
        next(err)
     }
}
export const countByType = async (req, res, next) => {
     
    try {
       const hotelCount = await Hotel.countDocuments({ type: "hotel"})
       const apartmentCount = await Hotel.countDocuments({ type: "apartment"})
       const resortCount = await  Hotel.countDocuments({ type: "resort"})
       const villaCount = await  Hotel.countDocuments({ type: "villa"})
       const cabinCount = await  Hotel.countDocuments({ type: "cabin"})

        
        res.status(200).json([
            {type: "hotel", count: hotelCount},
           { type: "apartment", count: apartmentCount } ,
           { type: "resort", count: resortCount} ,
            {type: "villa", count: villaCount },
           { type: "cabin", count: cabinCount },
         
        ]);
     } catch (err) {
        next(err)
     }
}

export const deleteHotels = async (req, res, next) => {
   
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Data will Deleted")
     } catch (error) {
        res.status(500).json(error)
     }
}

export const getHotelRooms = async(req, res, next) => {
   try {
      const hotel =await Hotel.findById(req.params.id)
      const list = await Promise.all(
        hotel.rooms.map((room) => {
            return Room.findById(room)
         })
      );
     res.status(200).json(list)
   } catch (err) {
      next(err)
   }
}