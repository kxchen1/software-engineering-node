/**
 * @file Implements mongoose schema for like
 */
import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";


/**
 * @typedef Like Represents the like relation between user and tuit
 * @property {ObjectId} tuit The user liked
 * @property {ObjectId} likedBy The user who liked the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;