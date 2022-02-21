/**
 * @file Implements DAO managing data storage of the message relations. Uses mongoose messageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of the message relations
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    /**
     * Insert message Instance into database
     * @param {string} uida the PK of the user who sends the message
     * @param {string} uidb the PK of the user who gets the message
     * @returns Promise To be notified when the message instance is inserted into database
     */
    userSendMessage = async (uida: string, uidb: string): Promise<Message> =>
        MessageModel.create({to: uida, from:uidb})

    /**
     * Retrieve the message Instance sent from the same user from database
     * @param {string} uid the PK of the user who sends the message
     * @returns Promise To be notified when the message instance is retrieved from database
     */
    userViewsMessageTheySent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid});

    /**
     * Retrieve the message Instance the user gets from database
     * @param {string} uid the PK of the user who get s the message
     * @returns Promise To be notified when the message instance is retrieved from database
     */
    userViewsMessageTheyGet = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});
    /**
     * Remove message Instance from database
     * @param {string} uida the PK of the user who sends the message
     * @param {string} uidb the PK of the user who gets the message
     * @returns Promise To be notified when the message instance is removed from database
     */
    userDeleteMessage = async (uida: string, uidb: string): Promise<any> =>
        MessageModel.deleteOne({to: uida, from:uidb});
}