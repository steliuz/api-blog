import mongoose, { Document, Model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { paginate } from '../paginate';

export interface IContent extends Document {
  title: string;
  category: mongoose.Schema.Types.ObjectId;
  url?: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  thematic: mongoose.Schema.Types.ObjectId;
}

const contentSchema: Schema<IContent> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    url: {
      type: String,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    thematic: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Thematic',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.plugin(toJSON);
contentSchema.plugin(paginate);

export const Content: Model<IContent> & { paginate: Function } = mongoose.model<IContent>('Content', contentSchema) as Model<IContent> & { paginate: Function };