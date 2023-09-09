const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const moment = require("moment");

const viewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Property",
      required: [true, "view should be of any property"],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "view of property. should be booked by a user"],
    },

    startTime: {
      type: Date,
      required: [true, "start date is required"],
    },
    endTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

viewSchema.plugin(mongoosePaginate);

viewSchema.pre("save", function (next) {
  this.endTime = moment(this.startTime).add(30, "m").toDate();

  next();
});

viewSchema.pre(/^find/, function (next) {
  this.populate({ path: "property", select: "title address city country" });

  next();
});

const View = mongoose.model("View", viewSchema);
module.exports = View;
