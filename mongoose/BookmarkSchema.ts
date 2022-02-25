/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";
/**
 * @typedef Bookmark Represents the bookmark relations between user and tuit
 * @property {ObjectId} bookmarkedTuit The user that bookmarks the tuit
 * @property {ObjectId} bookmarkedBy The tuit be bookmarked
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;