import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IExperience extends Document {
  companyImage?: string;
  companyLink?: string;
  companyName: string;
  companyShortName: string;
  description: string;
  endDate?: Date;
  isCurrent: boolean;
  isRemote: boolean;
  jobTitle: string;
  skills: string[];
  startDate: Date;
}

const experienceSchema: Schema<IExperience> = new Schema(
  {
    companyImage: { type: String },
    companyLink: { type: String },
    companyName: { required: true, type: String },
    companyShortName: { required: true, type: String },
    description: { required: true, type: String },
    endDate: { type: Date },
    isCurrent: { default: false, type: Boolean },
    isRemote: { default: false, type: Boolean },
    jobTitle: { required: true, type: String },
    skills: { default: [], type: [String] },
    startDate: { required: true, type: Date },
  },
  { timestamps: true }
);

const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>('Experience', experienceSchema);

export default Experience;
