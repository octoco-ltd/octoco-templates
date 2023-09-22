import { Router } from 'express';
import { ExampleController } from '../controllers/example-controller';
import {  isAuthenticated } from '../middleware/authentication';
import {HttpExampleClient} from "../clients/http/http-example-client";
import {FirestoreExampleRepository} from "../repositories/firestore/firestore-example-repository";
import {ExampleService} from "../services/example-service";

// Instantiate HTTP versions of clients
const exampleClient = new HttpExampleClient()

// Instantiate DB versions of repos
const exampleRepo = new FirestoreExampleRepository()


// Inject dependencies into service
const exampleService = new ExampleService(exampleRepo, exampleClient)

const exampleController = new ExampleController(exampleService)

const router = Router();

/**
 * @swagger
 * /examples/:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Examples
 *          description: Returns all Examples

 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ExamplesVMArr'
 */
router.get('/',isAuthenticated,  exampleController.getAllExamples.bind(exampleController));

/**
 * @swagger
 * /examples/{id}:
 *      get:
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the example
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Examples
 *          description: Returns a specific example


 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ExampleVM'
 */
router.get('/:id', isAuthenticated, exampleController.getExampleById.bind(exampleController));


/**
 * @swagger
 * /examples/:
 *      post:
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ExampleIM'
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Examples
 *          description: Returns a specific example


 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ExampleVM'
 */
router.post('/', isAuthenticated, exampleController.createAnExample.bind(exampleController))

export default router;
