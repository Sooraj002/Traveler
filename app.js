const express = require("express");
const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const mongoose = require("mongoose");
const Listing = require("../Traveler/models/listing");
const Review = require("../Traveler/models/review.js");
const { connect } = require("http2");

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


app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

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
    if (error) {
        // let errMsg = error.details.map((el) => el.message).join(",");
        // console.log(errMsg);
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

// Index Route
app.get("/listings", validateListing,
    wrapAsync(async (req, res) => {
        listings = await Listing.find({});
        res.render("listings/index.ejs", { listings });
    }));

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listings = await Listing.findById(id).populate("reviews");
        res.render("listings/show.ejs", { listings });
    }));

// Create Route
app.post("/listings", validateListing,
    wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listings);
        console.log(newListing);
        await newListing.save();
        res.redirect("/listings");
    }));

// Edit Route
app.get("/listings/:id/edit", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listings = await Listing.findById(id);
        res.render("listings/edit.ejs", { listings })
    }));

// Update Route
app.put("/listings/:id", validateListing,
    wrapAsync(async (req, res) => {
        if (!req.body.listings) {
            throw new ExpressError(400, "Send valid data for listing")
        }
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listings });
        res.redirect(`/listings/${id}`);
    }));

// Delete Route
app.delete("/listings/:id", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let listings = await Listing.findByIdAndDelete(id);
        console.log(listings);
        res.redirect("/listings");
    }));

// review
// post
app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("New Review saved");
    res.redirect(`/listings/${listing._id}`);
}));

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
