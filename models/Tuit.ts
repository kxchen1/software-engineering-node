/**
 * @file Declares Tuit data type representing the content of the tuit
 */
import User from "./User";

/**
 * @typedef Tuit Represents the data about the tuit
 * @property {string} tuit string of the content of the tuit
 * @property {Date} postedOn Date of the tuit
 * @property {User} postedBy User posts the tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}
