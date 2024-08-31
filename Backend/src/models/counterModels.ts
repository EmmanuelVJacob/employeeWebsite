import { Document, Schema, model } from "mongoose";

interface Counter extends Document {
  id: string;
  seq: number;
}

const counterSchema = new Schema<Counter>({
  id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const CounterModel = model<Counter>("Counter", counterSchema);
export default CounterModel;
