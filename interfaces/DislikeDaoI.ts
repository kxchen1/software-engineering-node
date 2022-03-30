/**
 * @file Declares Interface for API for Dislikes related data access object methods
 */
import Dislikes from "../models/dislikes/Dislike";


export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislikes[]>;
    findAllTuitsDislikedByUser (uid: string): Promise<Dislikes[]>;
    userUndislikesTuit (tid: string, uid: string): Promise<any>;
    userDislikesTuit (tid: string, uid: string): Promise<Dislikes>;
};