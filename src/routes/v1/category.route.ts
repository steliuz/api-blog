import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import * as categoryValidation from '../../modules/category/category.validation';
import * as categoryController from '../../modules/category/category.controller';
import { upload, addimageUploadedUrl, removeimageUploadedOnError } from '../../utils/multerUtils';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('create'), upload, addimageUploadedUrl, validate(categoryValidation.createCategory), removeimageUploadedOnError, categoryController.createCategory)
  .get(auth('read'), categoryController.getCategories);

router
  .route('/:categoryId')
  .get(auth('read'), validate(categoryValidation.getCategory), categoryController.getCategory)
  .put(auth('update'), upload, addimageUploadedUrl, validate(categoryValidation.updateCategory), removeimageUploadedOnError, categoryController.updateCategory)
  .delete(auth('delete'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

export default router;

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - imageUploaded
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [videos, documents, images]
 *               imageUploaded:
 *                 type: string
 *                 format: binary
 *                 description: Cover image file
 *     responses:
 *       "201":
 *         description: Category created
 *       "400":
 *         description: Bad request
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: List all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., name:asc, name:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of categories to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the category
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [videos, documents, images]
 *                       imageUploaded:
 *                         type: string
 *                         format: uri
 *                         description: URL of the cover image
 *                 page:
 *                   type: integer
 *                   description: The current page of the query
 *                 limit:
 *                   type: integer
 *                   description: The number of items per page
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 totalResults:
 *                   type: integer
 *                   description: The total number of results
 *               example:
 *                 results:
 *                   - id: "5f78ae68734d1d0123466789"
 *                     name: "Nature"
 *                     type: "Environmental"
 *                     imageUploaded: "http://example.com/image.jpg"
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 1
 *                 totalResults: 2
 *       "400":
 *         description: Bad request
 */

/**
 * @swagger
 * /category/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Category not found
 */

/**
 * @swagger
 * /category/{categoryId}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [videos, documents, images]
 *               imageUploaded:
 *                 type: string
 *                 format: binary
 *                 description: Cover image file
 *     responses:
 *       "200":
 *         description: Category updated
 *       "400":
 *         description: Bad request
 *       "404":
 *         description: Category not found
 */

/**
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Category deleted
 *       "404":
 *         description: Category not found
 */