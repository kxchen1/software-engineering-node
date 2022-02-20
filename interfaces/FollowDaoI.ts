import Follow from "../models/Follow";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersThatFollowThisUser (uid: string): Promise<Follow[]>;
    findAllUsersThatAreFollowed (uid: string): Promise<Follow[]>;
    userUnfollowsUser (uida: string, uidb: string): Promise<any>;
    userFollowsUser (uida: string, uidb: string): Promise<Follow>;
};