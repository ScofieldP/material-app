import mongoose from "mongoose";
const SupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    materialProvide: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", SupplierSchema);
