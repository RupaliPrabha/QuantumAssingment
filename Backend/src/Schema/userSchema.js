const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    dob: {
      type: String,
    },
    email: {
      type: String,
    },

    password: {
      type: String,
    },
    token :{
        type:Array,
     },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
