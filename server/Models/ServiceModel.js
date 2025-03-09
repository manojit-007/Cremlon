const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
   name: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: String, required: true },
   image: {
     public_id: {
       type: String,
     },
     url: {
       type: String,
     },
   },
 });

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;

