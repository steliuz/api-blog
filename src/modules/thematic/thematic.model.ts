import mongoose, { Document, Model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { paginate } from '../paginate';

export interface IThematic extends Document {
  name: string;
  permissions: {
    videos: boolean;
    documents: boolean;
    images: boolean;
  };
}

const thematicSchema: Schema<IThematic> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      videos: {
        type: Boolean,
        default: false,
      },
      documents: {
        type: Boolean,
        default: false,
      },
      images: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

thematicSchema.plugin(toJSON);
thematicSchema.plugin(paginate);

export const Thematic: Model<IThematic> & { paginate: Function } = mongoose.model<IThematic>('Thematic', thematicSchema) as Model<IThematic> & { paginate: Function };