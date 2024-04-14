// TODO4: you may need to import something here
import Member from "../models/memberModel.js";
import Item from "../models/itemModel.js";

export const createMember = async (req, res) => {
  // TODO4: implement this function
  try {
    const newMember = new Member(req.body);
    await newMember.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getMembers = async (req, res) => {
  // TODO4: implement this function
  const members = await Member.find();

  res.status(200).json(members);
};

export const deleteMember = async (req, res) => {
  // TODO4: implement this function
  const { id } = req.params;
  const member = await Member.findOne(
    {
      _id : id
    }
  );
  const delItemRes = await Item.deleteMany(
    {
      name: member.name
    }
  );
  const delRes = await Member.deleteOne(
    {
      _id : id
    }
  )
  if(delRes.acknowledged)
    res.status(200).json({message: "Success"});
  else
    res.status(400).json({message: "Bad Request"});
};