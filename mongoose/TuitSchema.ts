/**
 * @file Implements mongoose schema for tuit
 */
import mongoose, {Schema} from "mongoose";

/**
 * @property {string} tuit The content of the tuit
 * @property {ObjectId} postedBy The user post the tuit
 * @property {date} postedOn The date the tuit is post
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;