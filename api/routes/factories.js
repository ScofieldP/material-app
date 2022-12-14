import express from "express";
import {
  createFactory,
  updateFactory,
  deleteFactory,
  getFactory,
  get,
} from "../controllers/factoryController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createFactory);

// UPDATE
router.put("/:id", verifyAdmin, updateFactory);

// DELETE
router.put("/delete/:id", verifyAdmin, deleteFactory);

// GET
router.get("/find/:id", getFactory);

// GET ALL
router.get("/", get);

export default router;
