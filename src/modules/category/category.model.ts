import mongoose, { Document, Model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { paginate } from '../paginate';

export enum CategoryType {
  IMAGES = 'images',
  VIDEOS = 'videos',
  DOCUMENTS = 'documents',
}

export interface ICategory extends Document {
  name: string;
  type: CategoryType;
  imageUploaded: string;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CategoryType),
      required: true,
    },
    imageUploaded: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

export const Category: Model<ICategory> & { paginate: Function } = mongoose.model<ICategory>('Category', categorySchema) as Model<ICategory> & { paginate: Function };