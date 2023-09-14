import { Router } from 'express';

import { DefaultController } from '../controllers/default-controller';

const router = Router();

const defaultController = new DefaultController();

/**
 * @swagger
 * /:
 *      get:
 *          summary:
 *          tags:
 *              - DefaultEndpoints
 *          description: The default/test endpoint for the Basecamp API

 *          responses:
 *              200:
 *                  description: Success

 */
router.get('/', defaultController.defaultEndpoint.bind(defaultController));

export default router;
