import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as categoryService from './category.service';

interface CategoryFilter {
  name?: string;
  type?: { $in: string[] };
}

interface CategoryQuery {
  name?: string;
  type?: string;
  sortBy?: string;
  limit?: string;
  page?: string;
}

interface CategoryRequest extends Request {
  query: CategoryQuery & Record<string, any>;
}

/**
 * Create a category
 * @param {Request} req
 * @param {Response} res
 */
export const createCategory = catchAsync(async (req: any, res: Response) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cover image is required');
  }
  const imageUploadedUrl = `/public/images/${req.file.filename}`;
  const category = await categoryService.createCategory({ ...req.body, imageUploaded: imageUploadedUrl });
  res.status(httpStatus.CREATED).send(category);
});

/**
 * Get categories
 * @param {Request} req
 * @param {Response} res
 */
export const getCategories = catchAsync(async (req: CategoryRequest, res: Response) => {
  const filter: CategoryFilter = pick(req.query, ['name']);
  if (req.query.type) {
    filter.type = { $in: (req.query.type as string).split(',') };
  }
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.getCategories(filter, options);
  res.send(result);
});

/**
 * Get category by id
 * @param {Request} req
 * @param {Response} res
 */
export const getCategory = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['categoryId'] === 'string') {
    const category = await categoryService.getCategoryById(new mongoose.Types.ObjectId(req.params['categoryId']));
    if (!category) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    res.send(category);
  }
});

/**
 * Update category by id
 * @param {Request} req
 * @param {Response} res
 */
export const updateCategory = catchAsync(async (req: any, res: Response) => {
  if (typeof req.params['categoryId'] === 'string') {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUploaded = `/public/images/${req.file.filename}`;
    }
    const category = await categoryService.updateCategoryById(new mongoose.Types.ObjectId(req.params['categoryId']), updateData);
    res.send(category);
  }
});

/**
 * Delete category by id
 * @param {Request} req
 * @param {Response} res
 */
export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['categoryId'] === 'string') {
    await categoryService.deleteCategoryById(new mongoose.Types.ObjectId(req.params['categoryId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});