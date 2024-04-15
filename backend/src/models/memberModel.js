import mongoose from "mongoose";

// TODO4: create the member model
// HINT: you can see and understand how to create model in ./itemModel.js
const memberSchema = new mongoose.Schema({
    // item: {
    //   type: String,
    //   required: true,
    // },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    name: {
        type: String,
        required: true,
    }
  });
  
  const Member = mongoose.model("Member", memberSchema);
  
  export default Member;
  