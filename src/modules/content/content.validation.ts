import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

export const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    category: Joi.string().custom(objectId).required(),
    url: Joi.string().uri(),
    thematic: Joi.string().custom(objectId).required(),
    file: Joi.any().meta({ swaggerType: 'file' }).description('File upload field'),
    fileSend: Joi.boolean(),
    imageUploaded: Joi.string(),
  }),
};

export const get = {
  params: Joi.object().keys({
    contentId: Joi.string().custom(objectId).required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    contentId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    category: Joi.string().custom(objectId).required(),
    url: Joi.string().uri(),
    createdBy: Joi.string().custom(objectId).required(),
    thematic: Joi.string().custom(objectId).required(),
    imageUploaded: Joi.string(),
    file: Joi.any().meta({ swaggerType: 'file' }).description('File upload field'),
    fileSend: Joi.boolean(),
  }),
};

export const remove = {
  params: Joi.object().keys({
    contentId: Joi.string().custom(objectId).required(),
  }),
};