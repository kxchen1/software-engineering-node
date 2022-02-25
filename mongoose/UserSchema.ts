import mongoose from "mongoose";

/**
 * @property {string} username The name of the user
 * @property {string} password The password of the user
 * @property {string} firstName The first name of the user
 * @property {string} lastName The last name of the user
 * @property {string} email The email of the user
 * @property {string} profilePhoto The profile photo of the user
 * @property {string} headerImage the user's headerImage
 * @property {string} accountType The type of the account
 * @property {string} maritalStatus The status of marriage
 * @property {string} biography The user's summary
 * @property {date} dateOfBirth The user's birthday
 * @property {date} joined The date the user joined Tuiter
 * @property {location} the location of the user
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});
export default UserSchema;
