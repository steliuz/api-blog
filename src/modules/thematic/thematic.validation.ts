import Joi from 'joi';
import { objectId } from '../validate';

export const createThematic = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.object().keys({
      images: Joi.boolean(),
      videos: Joi.boolean(),
      documents: Joi.boolean(),
    }),
  }),
};

export const getThematic = {
  params: Joi.object().keys({
    thematicId: Joi.string().custom(objectId).required(),
  }),
};

export const updateThematic = {
  params: Joi.object().keys({
    thematicId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.object().keys({
      images: Joi.boolean(),
      videos: Joi.boolean(),
      documents: Joi.boolean(),
    }),
    _id: Joi.string(),
  }),
};

export const deleteThematic = {
  params: Joi.object().keys({
    thematicId: Joi.string().custom(objectId).required(),
  }),
};