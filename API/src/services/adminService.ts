import mongoose from "mongoose";
import User from "../models/user";
class adminService {
  public async deleteUser(id: mongoose.ObjectId): Promise<any> {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("No such user");
    return user;
  }

  public async getUsers(page: number): Promise<any> {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .skip((page - 1) * 10);
    return users;
  }
  public async searchUser(username: String): Promise<any> {
    const user = await User.find({ username: username });
    return user;
  }
}

export default adminService;
