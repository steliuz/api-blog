import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import * as thematicService from './thematic.service';

/**
 * Create a thematic
 * @param {Request} req
 * @param {Response} res
 */
export const createThematic = catchAsync(async (req: Request, res: Response) => {
    const thematic = await thematicService.createThematic(req.body);
    res.status(httpStatus.CREATED).send(thematic);
});

/**
 * Get thematics
 * @param {Request} req
 * @param {Response} res
 */
export const getThematics = catchAsync(async (req: any, res: Response) => {
    const filter = pick(req.query, ['name']);
    if (req.query.permissions) {
        const permissionsQuery = (req.query.permissions as string).split(',');

        // Using $and to ensure all specified permissions are true
        filter.$and = permissionsQuery
            .map((permission) => {
                if (['videos', 'documents', 'images'].includes(permission)) {
                    return { [`permissions.${permission}`]: true };
                }
                return null;
            })
            .filter((item) => item !== null);
    }

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const thematics = await thematicService.getThematics(filter, options);
    res.send(thematics);
});

/**
 * Get thematic by id
 * @param {Request} req
 * @param {Response} res
 */
export const getThematic = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['thematicId'] === 'string') {
        const thematic = await thematicService.getThematicById(new mongoose.Types.ObjectId(req.params['thematicId']));
        if (!thematic) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Thematic not found');
        }
        res.send(thematic);
    }
});

/**
 * Update thematic by id
 * @param {Request} req
 * @param {Response} res
 */
export const updateThematic = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['thematicId'] === 'string') {
        const thematic = await thematicService.updateThematicById(new mongoose.Types.ObjectId(req.params['thematicId']), req.body);
        res.send(thematic);
    }
});

/**
 * Delete thematic by id
 * @param {Request} req
 * @param {Response} res
 */
export const deleteThematic = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['thematicId'] === 'string') {
        await thematicService.deleteThematicById(new mongoose.Types.ObjectId(req.params['thematicId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});