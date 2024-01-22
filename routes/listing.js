const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage});

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listings[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(validateListing, wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.destroyListing)
  );

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.EditListing)
);

module.exports = router;
