import express from "express";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplier,
  get,
} from "../controllers/supplierController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createSupplier);

// UPDATE
router.put("/:id", verifyAdmin, updateSupplier);

// DELETE
router.put("/delete/:id", verifyAdmin, deleteSupplier);

// GET
router.get("/find/:id", getSupplier);

// GET ALL
router.get("/", get);

export default router;
