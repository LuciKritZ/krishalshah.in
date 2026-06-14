import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    passwordHash: { required: true, type: String },
  },
  { timestamps: true }
);

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
