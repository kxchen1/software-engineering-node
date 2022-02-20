import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findAllUsersThatAreFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({user: uid}).populate("userFollowed").exec();
    findAllUsersThatFollowThisUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({user: uid}).populate("userFollowing").exec();
    userFollowsUser = async (uida: string, uidb: string): Promise<any> =>
        FollowModel.create({userFollowed: uida, userFollowing: uidb});
    userUnfollowsUser = async (uida: string, uidb: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uida, userFollowing: uidb});
}