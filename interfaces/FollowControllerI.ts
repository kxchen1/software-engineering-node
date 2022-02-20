import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllUsersThatFollowThisUser (req: Request, res: Response): void;
    findAllUsersThatAreFollowed (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
};