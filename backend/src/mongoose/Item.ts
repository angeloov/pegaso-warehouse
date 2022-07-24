import { Schema, model } from "mongoose";

interface ItemType {
  _id: string;
  name: string;
  quantity: number;
  position: string;
  tags: string[];
  project_name: string;
  wasAlreadyPrinted: boolean;
  history: object[];
  website?: string;
  part_number?: string;
}



const itemSchema = new Schema<ItemType>({
  _id: String,
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  position: String,
  tags: [String],
  project_name: String,
  wasAlreadyPrinted: Boolean,
  history: [{}],
  website: String,
  part_number: String,
});

const itemModel = model<ItemType>("items", itemSchema);

export default itemModel;
export type { ItemType, JWTPayload };