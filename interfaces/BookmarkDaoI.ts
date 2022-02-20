import Like from "../models/Bookmark";
import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface BookmarkDaoI {
    findAllTuitsBookmarked (uid: string): Promise<Bookmark[]>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
};