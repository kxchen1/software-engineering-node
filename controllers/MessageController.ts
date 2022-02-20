import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid/messages/:uid", MessageController.messageController.userSendMessage);
            app.delete("/api/users/:uid/messages/:uid", MessageController.messageController.userDeleteMessage);
            app.get("/api/messages/users/:uid", MessageController.messageController.userViewsMessageTheyGet);
            app.get("/api/users/:uid/messages", MessageController.messageController.userViewsMessageTheySent);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    userViewsMessageTheyGet = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsMessageTheyGet(req.params.uid)
            .then(messages => res.json(messages));

    userViewsMessageTheySent = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsMessageTheySent(req.params.uid)
            .then(messages => res.json(messages));

    userDeleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteMessage(req.params.uid, req.params.uid)
            .then(status => res.send(status));

    userSendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendMessage(req.params.uid, req.params.uid)
            .then(messages => res.json(messages));
}