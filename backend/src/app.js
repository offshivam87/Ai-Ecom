const express = require("express")
const authRoutes = require("./routes/auth.route")
const cookieparser = require("cookie-parser")
const productRoutes = require("./routes/product.route")
const checkoutRoutes = require("./routes/checkout.route")
const path = require("path")

const cors = require("cors")


const app =  express()
app.use(express.static(path.join(__dirname,'../public')))


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use(express.json())
app.use(cookieparser())
app.use("/api/auth", authRoutes)
app.use("/api/product",productRoutes) 
app.use("/api", checkoutRoutes);
// app.use("/api",getAllProductsRoutes) 

app.get("*name",(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'))
})


module.exports= app