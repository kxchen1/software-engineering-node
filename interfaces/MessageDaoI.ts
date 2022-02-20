import Message from "../models/Message";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface MessageDaoI {
    userSendMessage (uida: string, uidb:string): Promise<Message>;
    userDeleteMessage (uida: string, uidb:string): Promise<any>;
    userViewsMessageTheySent (uid: string): Promise<Message[]>;
    userViewsMessageTheyGet (uid: string): Promise<Message[]>;
};