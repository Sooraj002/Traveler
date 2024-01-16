const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const Listing = require("../Traveler/models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


// const { listingSchema } = require("./schema.js");
// const { reviewSchema } = require("./schema.js");
// const Review = require("../Traveler/models/review.js");
// const { connect } = require("http2");
// const wrapAsync = require("./utils/wrapAsync.js")
main()
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        // let errMsg = error.details.map((el) => el.message).join(",");
        // console.log(errMsg);
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        // let errMsg = error.details.map((el) => el.message).join(",");
        // console.log(errMsg);
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

// Listing Route
app.use("/listings", listings);

// Review Route
app.use("/listings/:id/reviews", reviews);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    console.log(message._original);
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Sever is listening to port 8080");
});
