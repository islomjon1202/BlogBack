const express = require("express")
const app = express()
const {config} = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
config()

app.use(cors())
app.use(express.json())

mongoose
    .set('strictQuery', false)  
    .connect(process.env.MONGODB)
    .then(()=> console.log("MongoDB is connected"))
    .catch(()=> console.log("MongoDB is not connected"))

app.get("/", async(req, res)=>{
    res.json("App is running")
})

const Blog = require("./router/blog")

app.use("/blog", Blog)


const PORT = process.env.PORT || 6000
app.listen(PORT, ()=> console.log(PORT + " is listened"))
