import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

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

    findAllUsersThatFollowThisUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowThisUser(req.params.uid)
            .then(follows => res.json(follows));

    findAllUsersThatAreFollowed = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatAreFollowed(req.params.uid)
            .then(follows => res.json(follows));

    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.uid)
            .then(status => res.send(status));

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.uid)
            .then(follows => res.json(follows));
}