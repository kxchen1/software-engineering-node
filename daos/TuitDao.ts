import TuitModel from "../mongoose/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
export default class TuitDao implements TuitDao{
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({_id: uid});
    }
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid).populate('postedBy').exec();
    }
    async createTuit(tuit: Tuit):  Promise<Tuit> {
        return await TuitModel.create(tuit);
    }
    async updateTuit(tid: string,tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
}