import {
  BadRequestError,
  HttpError,
  InternalServerError,
  NotFoundError,
} from "../types/Errors";
import response from "../types/responses/response";
import { Inject, Service } from "typedi";
import {
  IUserInputDTO,
  IUserLoginDTO,
  IUserLoginOutputDTO,
} from "@/interfaces/IUser";
import UserRoles from "@/types/enums/userRoles";
import UserStatus from "@/types/enums/userStatus";
import { log } from "console";
import jwt, { Algorithm } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "@/config";

@Service()
export default class UserService {
  constructor(
    @Inject("userModel") private userModel: Models.UserModel,
    @Inject("sellerModel") private sellerModel: Models.SellerModel,
    @Inject("touristModel") private touristModel: Models.TouristModel,
    @Inject("advertiserModel") private advertiserModel: Models.AdvertiserModel,
    @Inject("tour_guideModel") private tourGuideModel: Models.Tour_guideModel,
    @Inject("governorModel") private governorModel: Models.GovernorModel
  ) {}

  public async createUserService(userData: IUserInputDTO) {
    // const phoneNumRegex =
    //   /^\+\d{1,3}[\s-]?(\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})$/;
    // if (!phoneNumRegex.test(userData.phone_number))
    //   throw new BadRequestError("Invalid phone number");
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!emailRegex.test(userData.email))
    //   throw new BadRequestError("Invalid email");

    const newUser = new this.userModel(userData);
    newUser.password = await bcrypt.hash(
      userData.password,
      parseInt(newUser.salt)
    );

    if (newUser instanceof Error)
      throw new InternalServerError("Internal server error");
    // throw new Error ("Internal server error");
    if (newUser == null) throw new HttpError("User not created", 404);
    // throw new Error("User not created");
    if (userData.role == UserRoles.Admin) {
      newUser.status = UserStatus.APPROVED;
    }
    await newUser.save();
    return new response(true, newUser, "User created", 201);
  }

  public async loginUserService(loginData: IUserLoginDTO) {
    let user;
    if (!loginData.username) {
      user = await this.userModel.findOne({ email: loginData.email });
    } else {
      user = await this.userModel.findOne({
        username: loginData.username,
      });
    }

    if (user instanceof Error)
      throw new InternalServerError("Internal server error");

    if (!user) throw new NotFoundError("User not found");

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password
    );
    if (!isPasswordValid) throw new BadRequestError("Password is incorrect");

    // if (user == null) throw new NotFoundError("User not found");
    // // throw new Error("User not found");
    // if (user.password !== loginData.password)
    //   throw new BadRequestError("Password is incorrect");

    const user_id = user._id;
    const role = user.role;
    let stakeholder_id;
    switch (role) {
      case UserRoles.Admin:
      case UserRoles.Seller:
        const seller = await this.sellerModel.findOne({ user_id });
        if (seller instanceof Error)
          throw new InternalServerError("Internal server error");
        if (seller == null) throw new NotFoundError("Seller not found");
        stakeholder_id = seller;
        break;

      case UserRoles.Tourist:
        const tourist = await this.touristModel.findOne({ user_id });
        if (tourist instanceof Error)
          throw new InternalServerError("Internal server error");
        if (tourist == null) throw new NotFoundError("Tourist not found");
        stakeholder_id = tourist;
        break;

      case UserRoles.Advertiser:
        const advertiser = await this.advertiserModel.findOne({ user_id });
        if (advertiser instanceof Error)
          throw new InternalServerError("Internal server error");
        if (advertiser == null) throw new NotFoundError("Advertiser not found");
        stakeholder_id = advertiser;
        break;

      case UserRoles.TourGuide:
        const tourGuide = await this.tourGuideModel.findOne({ user_id });
        if (tourGuide instanceof Error)
          throw new InternalServerError("Internal server error");
        if (tourGuide == null) throw new NotFoundError("Tour Guide not found");
        stakeholder_id = tourGuide;
        break;

      case UserRoles.Governor:
        const governor = await this.governorModel.findOne({ user_id });
        if (governor instanceof Error)
          throw new InternalServerError("Internal server error");
        if (governor == null) throw new NotFoundError("Governor not found");
        stakeholder_id = governor;
        break;
    }

    const token = jwt.sign(
      {
        id: user._id?.toString(), // Ensure _id is a string
        role: user.role,
        stakeholder_id: stakeholder_id?.toString(), // Ensure stakeholder_id is a string
      },
      config.jwtSecret as string,
      {
        expiresIn: "1h",
        algorithm: (config.jwtAlgorithm as Algorithm) || "HS256",
      }
    );

    const userOutput: IUserLoginOutputDTO = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      phone_number: user.phone_number,
      status: user.status,
      first_time_login: user.first_time_login,
      stakeholder_id: stakeholder_id,
      token: token,
    };
    user.first_time_login = false;
    await user.save();

    return new response(true, userOutput, "User found", 200);
  }
}
