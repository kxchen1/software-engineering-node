import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    userSendMessage = async (uida: string, uidb: string): Promise<Message> =>
        MessageModel.create({to: uida, from:uidb})
    userViewsMessageTheySent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid});
    userViewsMessageTheyGet = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});
    userDeleteMessage = async (uida: string, uidb: string): Promise<any> =>
        MessageModel.deleteOne({to: uida, from:uidb});
}