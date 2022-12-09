import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auths.js"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import cookieParser from "cookie-parser"

const app = express()


app.use(express.json())
app.use(cookieParser())
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO, () => {
        console.log("Database is connected")
    });    
}

app.use("/api/auths", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went Worng";
   return  res.status(status).json({
    success: false,
    status,
    message,
   });
});





app.listen(8000, () => {
    connect()
    console.log("Listen Port number : 8000")
})