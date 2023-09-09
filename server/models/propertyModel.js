const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: [5, "Property title should be atleast 5 characters long"],
      required: [true, "Property must have a title."],
    },
    description: {
      type: String,
      trim: true,
      minLength: [30, "Property desc should be atleast 30 characters long"],
      required: [true, "Property must have a desc."],
    },
    location: {
      type: { type: String, default: "Point", enum: ["Point"] },
      coordinates: {
        type: [Number],
        required: [true, "Property must have a location."],
      },
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Property must have a country."],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "Property must have a city."],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Property must have a address."],
    },
    price: {
      type: Number,
      min: [50, "Price should be greater than 50."],
      required: [true, "Property must have a price."],
    },
    images: {
      type: [String],
      trim: true,
      required: [true, "Property must have a images."],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, "Property must have a phone number."],
    },
    noOfBathrooms: {
      type: Number,
      min: [0, "Number of Bathrooms should be 0 or more than it."],
      max: [15, "Number of Bathrooms chould not be greater than 15"],
      required: [true, "Property must have a price."],
    },
    noOfBedrooms: {
      type: Number,
      min: [0, "Number of Bedrooms should be 0 or more than it."],
      max: [15, "Number of Bedrooms chould not be greater than 15"],
      required: [true, "Property must have a price."],
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

propertySchema.plugin(mongoosePaginate);
propertySchema.index({ price: 1, title: 1, city: 1 });
propertySchema.index({ location: "2dsphere" });

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
