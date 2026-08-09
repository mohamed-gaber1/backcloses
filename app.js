const express=require('express')
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();
const app=express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"));

const authRoute = require('./routes/auth.route');
const categoryRouter = require('./routes/category.route');
const productRouter = require('./routes/product.route');
const offerRouter = require('./routes/offer.route');
const branchRoute = require("./routes/branch.route");
const testimonialRoute = require("./routes/testimonial.route");
const settingsRoute = require('./routes/settings.route');
const bannerRoute = require("./routes/banner.route");
const aboutRoute = require("./routes/about.route");

app.use('/api/auth',authRoute)
app.use('/api/categories',categoryRouter);
app.use('/api/products',productRouter);
app.use('/api/offers',offerRouter);
app.use("/api/branches", branchRoute);
app.use("/api/testimonials", testimonialRoute);
app.use('/api/settings', settingsRoute);
app.use("/api/banners", bannerRoute);
app.use("/api/about", aboutRoute);

app.get("/",(req,res)=>{
    res.json({
        message:"Backend is running..."
    })
});
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

module.exports = app;