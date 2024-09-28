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
  public async searchUser(username: string): Promise<any> {
    const user = await User.find({ username: username });
    return user;
  }
  public async createGovernor(
    email: string,
    name: string,
    phone_number: string,
    username: string,
    password: string
  ): Promise<any> {
    const governor = await User.create({
      username,
      email,
      name,
      phone_number,
      password,
      role: "GOVERNOR",
    });
    return governor;
  }

  public async createAdmin(
    email: string,
    name: string,
    phone_number: string,
    username: string,
    password: string
  ): Promise<any> {
    const governor = await User.create({
      username,
      email,
      name,
      phone_number,
      password,
      role: "ADMIN",
    });
    return governor;
  }
}

export default adminService;
