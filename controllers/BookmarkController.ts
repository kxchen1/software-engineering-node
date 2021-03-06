/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the bookmarks created by a user
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to record that a user
 *     no londer bookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarked);
            app.put("/api/user/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userEditBookmark);
            app.delete("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userUnbookmarkAllTuits);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmarks that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Retrieves all bookmarks that user created from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who bookmarks tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findAllTuitsBookmarked = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarked(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Updates one bookmarks that user created from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who bookmarks tuits
     * parameter tid representing the tuit that is bookmarked by the user
     * @param {Response} res Represents response to client, including the
     * change of the status after updating
     */
    userEditBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userEditBookmark(req.params.uid, req.params.tid)
            .then(status => res.send(status));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is unbookmarking
     * the tuits
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks was successful or not
     */
    userUnbookmarkAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarkAllTuits(req.params.uid)
            .then(status => res.send(status));

}