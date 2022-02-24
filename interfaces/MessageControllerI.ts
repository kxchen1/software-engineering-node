import {Request, Response} from "express";

export default interface MessageControllerI {
    userSendMessage (req: Request, res: Response): void;
    userViewsMessageTheySent (req: Request, res: Response): void;
    userViewsMessageTheyGet (req: Request, res: Response): void;
    userDeleteMessage (req: Request, res: Response): void;
    userEditMessage (req:Request, res:Response): void;
    userDeleteAllMessages (req: Request, res: Response):void;
};