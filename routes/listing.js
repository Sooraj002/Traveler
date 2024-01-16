const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js")
// const { reviewSchema } = require("../schema.js");

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

// Index Route
router.get("/", validateListing,
    wrapAsync(async (req, res) => {
        listings = await Listing.find({});
        res.render("listings/index.ejs", { listings });
    }));

// New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listings = await Listing.findById(id).populate("reviews");
        res.render("listings/show.ejs", { listings });
    }));

// Create Route
router.post("/", validateListing,
    wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listings);
        console.log(newListing);
        await newListing.save();
        res.redirect("/listings");
    }));

// Edit Route
router.get("/:id/edit", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listings = await Listing.findById(id);
        res.render("listings/edit.ejs", { listings })
    }));

// Update Route
router.put("/:id", validateListing,
    wrapAsync(async (req, res) => {
        if (!req.body.listings) {
            throw new ExpressError(400, "Send valid data for listing")
        }
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listings });
        res.redirect(`/${id}`);
    }));

// Delete Route
router.delete("/:id", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let listings = await Listing.findByIdAndDelete(id);
        console.log(listings);
        res.redirect("/listings");
    }));


module.exports = router;