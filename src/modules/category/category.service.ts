import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Category, ICategory } from './category.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create a category
 * @param {ICategory} categoryBody
 * @returns {Promise<ICategory>}
 */
export const createCategory = async (categoryBody: ICategory): Promise<ICategory> => {
  return Category.create(categoryBody);
};

/**
 * Query for categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const getCategories = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  return Category.paginate(filter, options);
};

/**
 * Get category by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICategory | null>}
 */
export const getCategoryById = async (id: mongoose.Types.ObjectId): Promise<ICategory | null> => {
  return Category.findById(id);
};

/**
 * Update category by id
 * @param {mongoose.Types.ObjectId} id
 * @param {Partial<ICategory>} updateBody
 * @returns {Promise<ICategory | null>}
 */
export const updateCategoryById = async (
  id: mongoose.Types.ObjectId,
  updateBody: Partial<ICategory>
): Promise<ICategory | null> => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICategory | null>}
 */
export const deleteCategoryById = async (id: mongoose.Types.ObjectId): Promise<ICategory | null> => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.deleteOne();
  return category;
};