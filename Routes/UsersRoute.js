import express from "express"
import { addImage, addIntrest, addUser, getAvataar, getUser } from "../Controller/User.js"

const route = express.Router()

route.post('/addUser',addUser);
route.get('/getUser',getUser)
route.put('/addIntrest/:userid',addIntrest)
route.put("/addImage/:userid",addImage)
route.get("/avatar/:userid",getAvataar)



 export default route