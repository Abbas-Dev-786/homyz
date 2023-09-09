const mongoose = require("mongoose");
const moment = require("moment");
const View = require("../models/viewModel");
const factory = require("./FactoryHandler");
const AppError = require("../utils/AppError");
const Email = require("../utils/Email");
const catchAsync = require("../utils/catchAsync");

module.exports.createView = factory.createDoc(View);

module.exports.getAllView = factory.getAllDocs(View);

module.exports.getView = factory.getDoc(View);

module.exports.updateView = factory.updateDoc(View);

module.exports.deleteView = factory.deleteDoc(View);

module.exports.checkViews = catchAsync(async (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;

  const views = await View.aggregate([
    {
      $match: {
        property: new ObjectId(req.body.property),
      },
    },
    {
      $addFields: {
        dateDifference: {
          $dateDiff: {
            endDate: new Date(req.body.startTime),
            startDate: "$startTime",
            unit: "minute",
          },
        },
      },
    },
    {
      $match: {
        dateDifference: {
          $gte: 0,
          $lt: 30,
        },
      },
    },
  ]);

  if (views.length) {
    return next(new AppError("Someone has already booked on this time.", 400));
  }

  next();
});

module.exports.setIds = catchAsync(async (req, res, next) => {
  req.body.property = req.params.propertyId;
  req.body.user = req.user._id;

  next();
});
