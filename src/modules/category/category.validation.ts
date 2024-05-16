import Joi from 'joi';
import { CategoryType } from '../category/category.model';
import { objectId } from '../validate';

export const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(CategoryType))
      .required(),
    imageUploaded: Joi.string().required(),
    fileSend: Joi.boolean(),
  }),
};

export const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId).required(),
  }),
};

export const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string().valid(...Object.values(CategoryType)),
    imageUploaded: Joi.string(),
    _id: Joi.string(),
    fileSend: Joi.boolean(),
  }),
};

export const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId).required(),
  }),
};