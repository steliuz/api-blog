import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import * as contentValidation from '../../modules/content/content.validation';
import * as contentController from '../../modules/content/content.controller';
import { upload, addimageUploadedUrl, removeimageUploadedOnError } from '../../utils/multerUtils';
import { validateContentTypeUrl, validateContentTypeFile, validateThematicExists } from '../../modules/content/validators';

const router: Router = express.Router();

router
  .route('/')
  .post(
    auth('create'),
    upload,
    addimageUploadedUrl,
    validateContentTypeUrl,
    validateContentTypeFile,
    validateThematicExists,
    validate(contentValidation.create),
    removeimageUploadedOnError,
    contentController.createContent
  )
  .get(auth('read'), contentController.getContents);

router
  .route('/:contentId')
  .get(auth('read'), validate(contentValidation.get), contentController.getContent)
  .put(
    auth('update'),
    upload,
    addimageUploadedUrl,
    validateContentTypeUrl,
    validateContentTypeFile,
    validateThematicExists,
    validate(contentValidation.update),
    removeimageUploadedOnError,
    contentController.updateContent
  )
  .delete(auth('delete'), validate(contentValidation.remove), contentController.deleteContent);

router.get('/byThematic/all', auth('read'), contentController.getContentsByThematic);

export default router;



/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Content management
 */

/**
 * @swagger
 * /content:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new content entry based on category type
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - thematic
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: ID of the category, determines the content validation rules
 *               imageUploaded:
 *                 type: string
 *                 format: binary
 *                 description: File upload field, required for image or document type categories
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the content, required for video type categories
 *               thematic:
 *                 type: string
 *                 description: ID of the thematic
 *     responses:
 *       "201":
 *         description: Content created successfully
 *       "400":
 *         description: Bad request, possibly due to missing or invalid inputs based on category type
 */

/**
 * @swagger
 * /content/{contentId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a content entry by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *           description: ObjectId of the content
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /content/{contentId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a content entry
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               url:
 *                 type: string
 *                 format: uri
 *               createdBy:
 *                 type: string
 *               thematic:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Updated
 *       "400":
 *         description: Bad request
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /content/{contentId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove a content entry by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: No Content
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /content:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: List all content entries
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: thematic
 *         schema:
 *           type: string
 *         description: Filter by thematic
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., title:asc, title:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of content entries to return per page
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
 *                         description: The unique identifier of the content entry
 *                       title:
 *                         type: string
 *                       category:
 *                         type: string
 *                       url:
 *                         type: string
 *                         format: uri
 *                       createdBy:
 *                         type: string
 *                       thematic:
 *                         type: string
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
 *                   - id: "662a75def4a49800e7c66940"
 *                     title: "Amazing Nature"
 *                     category: "5f78ae68734d1d0123466789"
 *                     url: "http://example.com/nature"
 *                     createdBy: "5f78ae68734d1d0123466789"
 *                     thematic: "5f78ae68734d1d0123466789"
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 1
 *                 totalResults: 2
 *       "400":
 *         description: Bad request
 */

/**
 * @swagger
 * /content/byThematic:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: List all content entries by thematic
 *     tags: [Content]
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
 *                         description: The unique identifier of the content entry
 *                       title:
 *                         type: string
 *                       category:
 *                         type: string
 *                       url:
 *                         type: string
 *                         format: uri
 *                       createdBy:
 *                         type: string
 *                       thematic:
 *                         type: string
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
 *                   - id: "662a75def4a49800e7c66940"
 *                     title: "Amazing Nature"
 *                     category: "5f78ae68734d1d0123466789"
 *                     url: "http://example.com/nature"
 *                     createdBy: "5f78ae68734d1d0123466789"
 *                     thematic: "5f78ae68734d1d0123466789"
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 1
 *                 totalResults: 2
 *       "400":
 *         description: Bad request
 */