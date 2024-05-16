import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Content, IContent } from './content.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';

export const createContent = async (contentBody: IContent): Promise<IContent> => {
  return Content.create(contentBody);
};

export const getContents = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  return Content.paginate(filter, options);
};

export const getContentById = async (id: mongoose.Types.ObjectId): Promise<IContent | null> => {
  return Content.findById(id);
};

export const updateContentById = async (
  id: mongoose.Types.ObjectId,
  updateBody: Partial<IContent>
): Promise<IContent | null> => {
  const content = await getContentById(id);
  if (!content) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
  Object.assign(content, updateBody);
  await content.save();
  return content;
};

export const deleteContentById = async (id: mongoose.Types.ObjectId): Promise<IContent | null> => {
  const content = await getContentById(id);
  if (!content) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
  await content.deleteOne();
  return content;
};

export const getContentByThematic = async () => {
  const contents = await Content.aggregate([
    {
      $group: {
        _id: '$thematic',
        categories: {
          $push: '$category'
        }
      }
    },
    {
      $unwind: '$categories'
    },
    {
      $group: {
        _id: {
          thematic: '$_id',
          category: '$categories'
        },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.thematic',
        categories: {
          $push: {
            category: '$_id.category',
            count: '$count'
          }
        },
        total: { $sum: '$count' } // Calculate the total sum of counts
      }
    },
    {
      $lookup: {
        from: 'thematics', // Assuming your thematic collection is named 'thematics'
        localField: '_id',
        foreignField: '_id',
        as: 'thematic'
      }
    },
    {
      $unwind: '$thematic'
    },
    {
      $lookup: {
        from: 'categories', // Assuming your category collection is named 'categories'
        localField: 'categories.category',
        foreignField: '_id',
        as: 'categoryDetails'
      }
    },
    {
      $addFields: {
        categories: {
          $map: {
            input: '$categories',
            as: 'category',
            in: {
              category: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$categoryDetails',
                      as: 'categoryDetail',
                      cond: { $eq: ['$$categoryDetail._id', '$$category.category'] }
                    }
                  },
                  0
                ]
              },
              count: '$$category.count'
            }
          }
        }
      }
    },
    {
      $project: {
        _id: 1,
        total: 1,
        thematic: 1,
        categories: 1
      }
    }
  ]);

  // Calculate totalCategories
  const totalCategories = await Content.aggregate([
    {
      $unwind: '$category'
    },
    {
      $group: {
        _id: '$category',
        total: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'categoryDetails'
      }
    },
    {
      $unwind: '$categoryDetails'
    },
    {
      $project: {
        _id: 0,
        category: '$categoryDetails',
        total: 1
      }
    }
  ]);

  return { contents, totalCategories };
};