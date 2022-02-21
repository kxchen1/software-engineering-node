/**
 * @file Implements DAO managing data storage of the bookmark relations. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of the bookmark relations
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Uses BookmarkModel to retrieve all tuits documents from bookmarks collection
     * @param {string} uid the user make the bookmarks should be retrived from database
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsBookmarked = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();
    /**
     * Remove bookmark Instance from database
     * @param {string} tid the PK of the bookmarked tuit
     * @param {string} uid the PK of the user who bookmarks the tuit
     * @returns Promise To be notified when the bookmark instance is removed from database
     */
    userUnbookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});

    /**
     * Inserts bookmarks instance into the database
     * @param {string} uid the user who bookmarks inserted into the database
     * @param {string} tid the tuit gets bookmarked is inserted into the database
     * @returns Promise To be notified when bookmark instance is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
}