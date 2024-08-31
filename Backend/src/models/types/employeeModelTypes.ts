import { Document } from "mongoose";

export interface Employee extends Document {
  employeeId: number;
  name: string;
  email: string;
  mobileNo: number;
  designation: "HR" | "Manager" | "Sales";
  gender: "Male" | "Female";
  course: ("MCA" | "BCA" | "BSC")[];
  image: string;
}
