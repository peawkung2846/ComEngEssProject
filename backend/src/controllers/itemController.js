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
  console.log('a')
  try {
    const {filterName,index,value} = req.body;
    let items = []
    items = await Item.find({ name : filterName });
    items[0].pop[index] = value;
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