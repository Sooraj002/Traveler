const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../Traveler/models/listing");
const path = require("path");

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
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});


// Index Route
app.get("/listings",async(req, res) => {
    allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById( id );
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async(req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.save();
    res.redirect("/listings");
});


app.listen(8080, () => {
    console.log("Sever is listening to port 8080");
});
