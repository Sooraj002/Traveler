const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
  listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listings) {
    req.flash("error", "Listing you requested for doesn't exist!");
    res.redirect("/listings");
  }
  // console.log(listings);
  res.render("listings/show.ejs", { listings });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
  .forwardGeocode({
    query: req.body.listings.location,
    limit:1,
  })
  .send();
  console.log();

  
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url,"''", filename);
  const newListing = new Listing(req.body.listings);
  newListing.image= {url, filename};
  newListing.owner = req.user._id;
  newListing.geometry = response.body.features[0].geometry;
  let saved = await newListing.save();
  console.log(saved);
  req.flash("success", "new Listing Created");
  res.redirect("/listings");
};

module.exports.EditListing = async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id);
  if (!listings) {
    req.flash("error", "Listing you requested for doesn't exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listings });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listings) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listings });

  
  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
  }
    req.flash("success", "Listing Edited");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let listings = await Listing.findByIdAndDelete(id);
  console.log(listings);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
