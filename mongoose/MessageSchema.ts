/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef Message Represents the message sent by users
 * @property {string} message The content of the message
 * @property {ObjectId} to The user gets the message
 * @property {ObjectId} from The user sent the message
 * @property {date} sentOn The date of the message
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: String,
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: Date
}, {collection: "messages"});
export default MessageSchema;