/**
 * @file Implements DAO managing data storage of the follow relations. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of the follow relations
 * @property {FollowDao} followDao Private single instance of followDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Uses FollowModel to retrieve all user documents followed by the certain user from database
     * @param {string} uid the PK of the user who follows the other users
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatAreFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({user: uid}).populate("userFollowed").exec();

    /**
     * Uses FollowModel to retrieve all user documents following the user from follows collection
     * @param {string} uid the user who are followed
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatFollowThisUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({user: uid}).populate("userFollowing").exec();

    /**
     * Inserts followss instance into the database
     * @param {string} uida the user who is followed is inserted into the database
     * @param {string} uidb the user who follows other users is inserted into the database
     * @returns Promise To be notified when follow instance is inserted into the database
     */
    userFollowsUser = async (uida: string, uidb: string): Promise<any> =>
        FollowModel.create({userFollowed: uida, userFollowing: uidb});

    /**
     * Remove follow Instance from database
     * @param {string} uida the PK of the user who is followed
     * @param {string} uidb the PK of the user who follows
     * @returns Promise To be notified when the follow instance is removed from database
     */
    userUnfollowsUser = async (uida: string, uidb: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uida, userFollowing: uidb});

    /**
     * Update follow Instance from database
     * @param {string} uida the PK of the user who is followed
     * @param {string} uidb the PK of the user who follows
     * @returns Promise To be notified when the follow instance is updated from database
     */
    userUpdateFollowRelation = async(uida: string, uidb: string): Promise<any> =>
        FollowModel.updateOne({userFollowed: uida, userFollowing: uidb});


    /**
     * Remove all follow Instance related to one user from database
     * @param {string} uid the PK of the user who is followed
     * @returns Promise To be notified when the follow instances are removed from database
     */
    userUnfollowAllUsers = async(uid: string): Promise<any> =>
        FollowModel.deleteMany({userFollowed: uid});
}