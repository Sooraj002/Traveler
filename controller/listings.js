const Listing = require("../models/listing.js");

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
  const newListing = new Listing(req.body.listings);
  newListing.owner = req.user._id;
  await newListing.save();
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
  await Listing.findByIdAndUpdate(id, { ...req.body.listings });
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
