import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import hotelRoute from "./api/routes/hotels.js"
import authRoute from "./api/routes/auth.js"
import userRoute from "./api/routes/user.js"
import roomRoute from "./api/routes/room.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app  = express()
dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDb")
      } catch (error) {
          throw error 
      }
};

//Middleware 
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/hotel', hotelRoute)
app.use('/api/user', userRoute)
app.use('/api/room', roomRoute)

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Somthing went Wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})



app.listen(5000, () => {
    connect()
    console.log("Connected to backend")
})