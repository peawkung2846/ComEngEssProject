import express from "express";

import * as itemController from "../controllers/itemController.js";

const router = express.Router();

router.get("/", itemController.getItems);
router.post("/", itemController.createItem);
router.post("/update/", itemController.update);
router.post("/check/",itemController.checkID);
router.delete("/:id", itemController.deleteItem);
router.post("/filter", itemController.filterItems);
// TODO3: add a router for the filter function

export default router;
