/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/messages/users/:uid to retrieve all the messages a user gets
 *     </li>
 *     <li>GET /api/users/:uid/messages to retrieve all the messages a user sends
 *     </li>
 *     <li>POST /api/users/:uid/messages/:uid to create a new message
 *     </li>
 *     <li>DELETE /api/users/:uid/messages/:uid to delete a message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid/messages/:uid", MessageController.messageController.userSendMessage);
            app.delete("/api/users/:uid/messages/:uid", MessageController.messageController.userDeleteMessage);
            app.get("/api/messages/users/:uid", MessageController.messageController.userViewsMessageTheyGet);
            app.get("/api/users/:uid/messages", MessageController.messageController.userViewsMessageTheySent);
            app.put("/api/users/:uid/messages/:uid", MessageController.messageController.userEditMessage);
            app.delete("/api/users/:uid/messages", MessageController.messageController.userDeleteAllMessages);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages a user gets from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who gets the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    userViewsMessageTheyGet = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsMessageTheyGet(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages a user sends from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who sends the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    userViewsMessageTheySent = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsMessageTheySent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid representing the messages between two users are removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteMessage(req.params.uid, req.params.uid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid representing the message between two users are created
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    userSendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendMessage(req.params.uid, req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid representing the messages between two users are edited
     * @param {Response} res Represents response to client, including status
     * on whether updating the message was successful or not
     */
    userEditMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userEditMessage(req.params.uid, req.params.uid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the messages sent by this user are removed
     * @param {Response} res Represents response to client, including status
     * on whether updating the message was successful or not
     */
    userDeleteAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteAllMessages(req.params.uid)
            .then(status => res.send(status));
}