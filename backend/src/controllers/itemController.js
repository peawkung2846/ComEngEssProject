import { error } from "console";
import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const update = async (req, res) => {
  try {
    const {filterId,value} = req.body;
    let items = []
    items = await Item.find({ id : filterId });
    items[0].pop = value;
    await items[0].save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
};

export const checkID= async(req,res) => {
  const ipAddress = req.body.id;

  try{
    const foundIP = await Item.findOne({id : ipAddress});

    //console.log('ipAddress:', ipAddress);
    //console.log('foundItem:', foundIP);

    if (foundIP) {
      res.json({ message: true, item: foundIP });
    } else {
      res.json({ message: false });
    }
  }
  catch (err){
    console.error('Error cheching IP : ',err);
    res.status(500).json({error: 'server ip error'});
  }
};

export const deleteItem = async (req, res) => {
  // TODO2: implement this function
  // HINT: you can serve the internet and find what method to use for deleting item.
  const { id } = req.params;
  const delRes = await Item.deleteOne(
    {
      _id : id
    }
  )
  if(delRes.acknowledged)
    res.status(200).json({message: "Success"});
  else
    res.status(400).json({message: "Bad Request"});
};

export const filterItems = async (req, res) => {
  // TODO3: implement this filter function
  // WARNING: you are not allowed to query all items and do something to filter it afterward.
  // Otherwise, you will be punished by -0.5 scores for this part
  const { filterName, lowerPrice, upperPrice } = req.body;
  let items = []
  if(filterName == "ทั้งหมด"){
    console.log("Here");
    items = await Item.find(
      {
        $and: [
          { price : { $gte: lowerPrice}},
          { price : { $lte: upperPrice}}
        ]     
      }
    );
  }
  else{
    items = await Item.find(
      {
        $and: [
          { price : { $gte: lowerPrice}},
          { price : { $lte: upperPrice}},
          { name : filterName }
        ]
      }
    );
  }
  console.log(items);
  res.status(200).json(items);
};