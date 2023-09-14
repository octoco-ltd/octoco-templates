import {  UserRepository } from '../repositories/user-repository';
import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { isAdmin, isAuthenticated } from '../middleware/authentication';
import { FirestoreUserRepository } from '../repositories/firestore/firestore-user-repository';
import { UserService } from '../services/user-service';
import { LedgerService } from '../services/ledger-service';
import { FirestoreLedgerRepository } from '../repositories/firestore/firestore-ledger-repository';
import { HttpAuth0Client } from '../clients/http/http-auth0-client';

const auth0Client = new HttpAuth0Client()

const userRepo: UserRepository = new FirestoreUserRepository();
const ledgerRepo = new FirestoreLedgerRepository()

const userService = new UserService(userRepo, auth0Client)
const ledgerService = new LedgerService(ledgerRepo)

const userController = new UserController(userService, ledgerService);

const router = Router();

/**
 * @swagger
 * /users/:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Users
 *          description: Returns all users in Firestore

 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/AllUsersVM'
 */
router.get('/',isAuthenticated, isAdmin, userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /users/{id}:
 *      get:
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the user in Firestore
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Users
 *          description: Returns a specific user from the Firestore DB


 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserVM'
 */
router.get('/:id', isAuthenticated, userController.getUserByID.bind(userController));


/**
 * @swagger
 * /users/{id}:
 *      patch:
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the user in Firestore
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Users
 *
 *          description: Updates a User's metadata in our Database
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateUserMetadataIM'

 *          responses:
 *              200:
 *                  description: Success
 */
router.patch('/:id', isAuthenticated, userController.updateUserMetadata.bind(userController));

/**
 * @swagger
 * /users/{id}:
 *      patch:
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the user in Firestore
 *              - in: query
 *                name: mfaEnabled
 *                required: true
 *                schema:
 *                  type: boolean
 *                description: Boolean for whether the user wants MFA enabled or not
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Users
 *
 *          description: Enables or disables 2FA for a user

 *          responses:
 *              200:
 *                  description: Success
 */
router.patch('/mfa/:id', isAuthenticated, userController.toggleMFA.bind(userController));

/**
 * @swagger
 * /users/disable/{id}:
 *      patch:
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the user in Firestore
 *              - in: query
 *                name: isDisabled
 *                required: true
 *                schema:
 *                  type: boolean
 *                description: Boolean for whether the user is disabled or not
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Users
 *
 *          description: Updates a User's metadata in our Database
 *          responses:
 *              200:
 *                  description: Success
 */
router.patch('/disabled/:id', isAuthenticated, isAdmin, userController.updateUserMetadata.bind(userController));

/**
 * @swagger
 * /users/{id}:
 *      delete:
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the user in Firestore
 *          security:
 *              - bearerAuth: []
 *          summary:
 *          tags:
 *              - Users
 *          description: Remove a user from our database

 *          responses:
 *              200:
 *                  description: Success
 */
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser.bind(userController));

/**
 * @swagger
 * /users/kyc/{id}:
 *      get:
 *          description: This endpoint returns all of a User's KYC information
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the user in Firestore
 *          security:
 *              - ApiKeyAuth: []
 *          summary:
 *          tags:
 *              - Users
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserKYCDetailsVM'
 */
router.get('/kyc/:id', isAuthenticated, userController.getUserKYCDetails.bind(userController));


/**
 * @swagger
 * /users/account-balance/{id}:
 *      get:
 *          description: This endpoint returns the user's account balance
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: The ID of the user in Firestore
 *          security:
 *              - ApiKeyAuth: []
 *          summary:
 *          tags:
 *              - Users
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserAccountBalanceVM'
 */
router.get('/account-balance/:id',  userController.getUserAccountBalance.bind(userController));

export default router;
