const Property = require("../models/propertyModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./FactoryHandler");

module.exports.getAllProperties = factory.getAllDocs(Property);

module.exports.getProperty = factory.getDoc(Property);

module.exports.updateProperty = factory.updateDoc(Property);

module.exports.deleteProperty = factory.deleteDoc(Property);

module.exports.createProperty = factory.createDoc(Property);

module.exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await Property.aggregate([
    {
      $group: {
        _id: "$city",
      },
    },
  ]);

  res
    .status(200)
    .json({ status: "success", results: cities.length, data: cities });
});

module.exports.getTop10 = (req, res, next) => {
  req.query.limit = 10;
  req.query.sort = "-price";

  next();
};

module.exports.setCoordinates = (req, res, next) => {
  req.body.location = {
    type: "Point",
    coordinates: req.body.location,
  };

  next();
};
