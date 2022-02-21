/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/follows/users/:ui to retrieve all the users followed by one user
 *     </li>
 *     <li>GET /api/users/:uid/follows to retrieve all users that following a user
 *     </li>
 *     <li>POST /api/users/:uid/follows/:uid to record that a user follows a user
 *     </li>
 *     <li>DELETE /api/users/:uid/follows/:uid to record that a user
 *     no londer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:uid", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid/follows/:uid", FollowController.followController.userUnfollowsUser);
            app.get("/api/follows/users/:uid", FollowController.followController.findAllUsersThatAreFollowed);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersThatFollowThisUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all users that followed a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllUsersThatFollowThisUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowThisUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that are followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who is following
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllUsersThatAreFollowed = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatAreFollowed(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid representing the user that is unfollowing
     * the other user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.uid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid representing the user that is following the tuit
     * and the other user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.uid)
            .then(follows => res.json(follows));
}