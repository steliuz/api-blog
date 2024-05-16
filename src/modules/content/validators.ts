import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { Category } from '../category/category.model';
import { Thematic } from '../thematic/thematic.model';

export const validateContentTypeFile = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { category } = req.body;

    if (!category) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Category is required');
    }

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }

    if ((categoryDoc.type === 'images' || categoryDoc.type === 'documents') && !req.file) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'File is required for image or document type categories');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateContentTypeUrl = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { category, url, fileSend } = req.body;

    if (!category) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Category is required');
    }

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }

    if (categoryDoc.type === 'videos' && !url) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'URL is required for video type categories');
    }

    if (categoryDoc.type === 'videos' && fileSend) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'File upload is not allowed for video type categories');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateThematicExists = async (req: Request, _res: Response, next: NextFunction) => {
  const { thematic } = req.body;

  if (!thematic) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Thematic is required'));
  }

  const thematicExists = await Thematic.findById(thematic);
  if (!thematicExists) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Thematic not found'));
  }

  next();
};