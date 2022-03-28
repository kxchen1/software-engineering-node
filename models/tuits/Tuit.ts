import User from "../users/User";
import mongoose from "mongoose";
import Stats from "./Stats";

export default interface Tuit {
    _id?: mongoose.Schema.Types.ObjectId;
    tuit: string;
    postedBy?: User;
    postedOn: Date;
    stats: Stats;
}