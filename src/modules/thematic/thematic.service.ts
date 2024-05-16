import mongoose from 'mongoose';
import { Thematic, IThematic } from './thematic.model';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create a thematic
 * @param {IThematic} thematicBody
 * @returns {Promise<IThematic>}
 */
export const createThematic = async (thematicBody: IThematic): Promise<IThematic> => {
  return Thematic.create(thematicBody);
};

/**
 * Query for thematics
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const getThematics = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  return Thematic.paginate(filter, options);
};

/**
 * Get thematic by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IThematic | null>}
 */
export const getThematicById = async (id: mongoose.Types.ObjectId): Promise<IThematic | null> => {
  return Thematic.findById(id);
};

/**
 * Update thematic by id
 * @param {mongoose.Types.ObjectId} id
 * @param {Partial<IThematic>} updateBody
 * @returns {Promise<IThematic | null>}
 */
export const updateThematicById = async (
  id: mongoose.Types.ObjectId,
  updateBody: Partial<IThematic>
): Promise<IThematic | null> => {
  const thematic = await getThematicById(id);
  if (!thematic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thematic not found');
  }
  Object.assign(thematic, updateBody);
  await thematic.save();
  return thematic;
};

/**
 * Delete thematic by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IThematic | null>}
 */
export const deleteThematicById = async (id: mongoose.Types.ObjectId): Promise<IThematic | null> => {
  const thematic = await getThematicById(id);
  if (!thematic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thematic not found');
  }
  await thematic.deleteOne();
  return thematic;
};