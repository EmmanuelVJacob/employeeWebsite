import { Document, Schema, model } from "mongoose";
import CounterModel from "./counterModels";

export interface EmployeeDocument extends Document {
  employeeId: number;
  name: string;
  email: string;
  mobileNo: number;
  designation: "HR" | "Manager" | "Sales";
  gender: "Male" | "Female";
  course: ("MCA" | "BCA" | "BSC")[]; 
  image: string;
}

const employeeSchema = new Schema<EmployeeDocument>(
  {
    employeeId: { type: Number, unique: true },
    name: { type: String, required: true, default: "" },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: Number, required: true },
    designation: {
      type: String,
      enum: ["HR", "Manager", "Sales"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    course: {
      type: [String],
      enum: ["MCA", "BCA", "BSC"],
      required: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

employeeSchema.pre<EmployeeDocument>("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await CounterModel.findOneAndUpdate(
        { id: "employeeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.employeeId = counter ? counter.seq : 1;
    } catch (error: any) {
      return next(error);
    }
  }
  next();
});

const EmployeeModel = model<EmployeeDocument>("Employee", employeeSchema);

export default EmployeeModel;
