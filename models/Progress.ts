import mongoose, { Schema, Model, Types } from 'mongoose';

export interface ProgressEntry {
  td: boolean;
  bu: boolean;
  note: string;
}

export interface ProgressDocument {
  userId: Types.ObjectId;
  entries: Map<string, ProgressEntry>;
  createdAt: Date;
  updatedAt: Date;
}

const EntrySchema = new Schema<ProgressEntry>(
  {
    td: { type: Boolean, default: false },
    bu: { type: Boolean, default: false },
    note: { type: String, default: '' },
  },
  { _id: false }
);

const ProgressSchema = new Schema<ProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    entries: { type: Map, of: EntrySchema, default: () => ({}) },
  },
  { timestamps: true }
);

export const Progress: Model<ProgressDocument> =
  mongoose.models.Progress || mongoose.model<ProgressDocument>('Progress', ProgressSchema);
