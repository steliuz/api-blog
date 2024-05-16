import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as contentService from './content.service';

interface ContentFilter {
  title?: string;
  thematic?: string;
  category?: string;
}

interface ContentQuery {
  title?: string;
  thematic?: string;
  category?: string;
  sortBy?: string;
  limit?: string;
  page?: string;
}

interface ContentRequest extends Request {
  query: ContentQuery & Record<string, any>;
}

export const createContent = catchAsync(async (req: any, res: Response) => {
  if (req.body.imageUploaded) {
    req.body.url = req.body.imageUploaded;
  }
  req.body.createdBy = '662a87ae84aa060084c00ead'; /* req.user._id */
  const content = await contentService.createContent(req.body);
  res.status(httpStatus.CREATED).send(content);
});

export const getContentsByThematic = catchAsync(async (_req: Request, res: Response) => {
  const contents = await contentService.getContentByThematic();
  res.send(contents);
});

export const getContents = catchAsync(async (req: ContentRequest, res: Response) => {
  const filter: ContentFilter = pick(req.query, ['title', 'thematic', 'category']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const contents = await contentService.getContents(filter, options);
  res.send(contents);
});

export const getContent = catchAsync(async (req: any, res: Response) => {
  const content = await contentService.getContentById(new mongoose.Types.ObjectId(req.params.contentId));
  if (!content) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
  res.send(content);
});

export const updateContent = catchAsync(async (req: any, res: Response) => {
  const content = await contentService.updateContentById(new mongoose.Types.ObjectId(req.params.contentId), req.body);
  res.send(content);
});

export const deleteContent = catchAsync(async (req: any, res: Response) => {
  await contentService.deleteContentById(new mongoose.Types.ObjectId(req.params.contentId));
  res.status(httpStatus.NO_CONTENT).send();
});