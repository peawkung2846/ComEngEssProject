import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pop: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;