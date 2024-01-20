const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

//  importing database and connecting
// const mongoose = require("mongoose");
main().catch(err => console.log(err));

main()
    .then(() => {
        console.log("Connected To db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "65aad226a31858a90d70be76"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
