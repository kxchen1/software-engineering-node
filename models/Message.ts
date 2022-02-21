/**
 * @file Declares Message data type representing relationship between
 * two users, as in user sends message to another user
 */
import User from "./User";

/**
 * @typedef Message Represents messages relationship between two users,
 * as in a user messages another user
 * @property {string} message string of the content of the message
 * @property {User} to User who gets the message
 * @property {User} from User who sends the message
 * @property {Date} sentOn the time of sending the message
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
};