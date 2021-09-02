const mongoose = require("mongoose");
const Schema = mongoose.Schema
const CategorySchema = Schema({
    name:{
        type: String,
        required: true,
    },
},
{
    timestamps: true
  }
)

module.exports = mongoose.model('categories', CategorySchema);