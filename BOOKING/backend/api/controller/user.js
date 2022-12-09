import User from "../models/user.js"


export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set : req.body }, { new : true })
        res.status(200).json(updateUser)
     } catch (error) {
        res.status(500).json(error)
     }
}
export const oneUser = async (req, res, next) => {
    try {
        const singleUser = await User.findById(req.params.id)
        res.status(200).json(singleUser)
     } catch (error) {
        res.status(500).json(error)
     }
}
export const allUser = async (req, res, next) => {
   
    try {
        const allUser = await User.find()
        res.status(200).json(allUser)
     } catch (err) {
        next(err)
     }
}
export const deleteUser = async (req, res, next) => {
   
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Data will Deleted")
     } catch (error) {
        res.status(500).json(error)
     }
}

