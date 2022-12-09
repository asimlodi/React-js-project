import Room from "../models/room.js"
import Hotel from "../models/hotel.js"
import { createError } from "../utils/error.js";


export const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body) 

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id }
            })
        } catch (err) {
            next(err)
        }
      res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set : req.body }, { new : true })
        res.status(200).json(updateRoom)
     } catch (error) {
        res.status(500).json(error)
     }
}
export const oneRoom = async (req, res, next) => {
    try {
        const singleRoom = await Room.findById(req.params.id)
        res.status(200).json(singleRoom)
     } catch (error) {
        res.status(500).json(error)
     }
}
export const allRoom  = async (req, res, next) => {
   
    try {
        const allRoom  = await Room.find()
        res.status(200).json(allRoom )
     } catch (err) {
        next(err)
     }
}
export const deleteRoom  = async (req, res, next) => {
    const hotelId = req.params.hotelid;
   
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room data will Deleted")
     } catch (error) {
        res.status(500).json(error)
     }
}




