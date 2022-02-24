import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findAllTuitsBookmarked (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userEditBookmark (req: Request, res: Response): void;
    userUnbookmarkAllTuits (req: Request, res: Response): void;
};