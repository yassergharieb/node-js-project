const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    Name: { type: String, require: true, min: 10, max: 20, trim: true },

    Email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid Email");
      },
    },

    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
},
    Biography: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

authorSchema.methods.toJSON = function () {
  const author = this.toObject();

  delete author._v;
  return author;
};

const author = mongoose.model("author", authorSchema);
module.exports = author;
