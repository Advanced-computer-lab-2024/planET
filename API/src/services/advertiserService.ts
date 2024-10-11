import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "@/types/Errors";
import response from "@/types/responses/response";
import Container, { Inject, Service } from "typedi";
import { Types } from "mongoose";
import {
  IAdvertiser,
  IAdvertiserMain,
  IAdvertiserUpdateDTO,
} from "@/interfaces/IAdvertiser";
import User from "@/models/user";
import UserRoles from "@/types/enums/userRoles";
import UserService from "./userService";
import user from "@/api/routes/user";
import bcrypt from "bcryptjs";
@Service()
export default class AdvertiserService {
  constructor(
    @Inject("advertiserModel") private advertiserModel: Models.AdvertiserModel,
    @Inject("userModel") private userModel: Models.UserModel
  ) {}
  //Create Advertiser
  public createAdvertiserService = async (advertiserData: IAdvertiser) => {
    const IUserInputDTO = {
      email: advertiserData.email,
      name: advertiserData.name,
      username: advertiserData.username,
      password: advertiserData.password,
      role: UserRoles.Advertiser,
      phone_number: advertiserData.phone_number,
    };
    const userService: UserService = Container.get(UserService);
    const newUserResponse = await userService.createUserService(IUserInputDTO);
    const newUser = new this.userModel(newUserResponse.data);
    const user = await newUser.save();
    if (user instanceof Error)
      throw new InternalServerError("Internal server error");

    const IAdvertiserCreateDTO = {
      user_id: user._id,
      activities: advertiserData.activities,
      documents_required: advertiserData.documents_required,
      link_to_website: advertiserData.link_to_website,
      hotline: advertiserData.hotline,
      about: advertiserData.about,
      logo: advertiserData.logo,
      company_profile: advertiserData.company_profile,
    };
    const advertiser = await this.advertiserModel.create(IAdvertiserCreateDTO);
    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    return new response(true, advertiser, "Advertiser created", 201);
  };

  public createAdvertiserMainDataService = async (
    advertiserData: IAdvertiserMain
  ) => {
    const IUserInputDTO = {
      email: advertiserData.email,
      name: advertiserData.name,
      username: advertiserData.username,
      password: advertiserData.password,
      role: UserRoles.Advertiser,
      phone_number: advertiserData.phone_number,
    };
    const userService: UserService = Container.get(UserService);
    const newUserResponse = await userService.createUserService(IUserInputDTO);
    const newUser = new this.userModel(newUserResponse.data);
    const user = await newUser.save();
    if (user instanceof Error)
      throw new InternalServerError("Internal server error");

    const IAdvertiserCreateDTO = {
      user_id: user._id,
      documents_required: advertiserData.documents_required,
    };

    const advertiser = await this.advertiserModel.create(IAdvertiserCreateDTO);
    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    return new response(true, advertiser, "Advertiser created", 201);
  };

  //Get all Advertisers
  public getAllAdvertisersService = async () => {
    const advertisers = await this.advertiserModel.find({});
    if (advertisers instanceof Error)
      throw new InternalServerError("Internal server error");
    if (advertisers == null) throw new NotFoundError("No Advertisers Found");
    return new response(true, advertisers, "All Advertisers are fetched", 200);
  };
  //Get Advertiser by Email
  public getAdvertiserByEmailService = async (email: string) => {
    const user = await this.userModel.findOne({
      email: email,
      role: UserRoles.Advertiser,
    });
    if (user instanceof Error)
      throw new InternalServerError("Internal server error");
    if (user == null) throw new NotFoundError("No User Found");
    const advertiser = await this.advertiserModel.findOne({
      user_id: user._id,
    });
    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    if (advertiser == null) throw new NotFoundError("No Advertiser Found");
    return new response(true, advertiser, "Advertiser found", 200);
  };
  //Get Advertiser by ID
  public getAdvertiserByIDService = async (id: string) => {
    const advertiser = await this.advertiserModel.findById(
      new Types.ObjectId(id)
    );
    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    if (advertiser == null) throw new NotFoundError("No Advertiser Found");
    return new response(true, advertiser, "Advertiser found", 200);
  };
  //Get Advertiser by User ID
  public getAdvertiserByUserIDService = async (userID: string) => {
    const advertiser = await this.advertiserModel.findOne({
      user_id: new Types.ObjectId(userID),
    });
    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    if (advertiser == null) throw new NotFoundError("No Advertiser Found");
    return new response(true, advertiser, "Advertiser found", 200);
  };
  //Get Advertiser by Activity ID
  public getAdvertiserByActivityIDService = async (activityID: string) => {
    const advertiser = await this.advertiserModel.findOne({
      activities: new Types.ObjectId(activityID),
    });
    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    if (advertiser == null) throw new NotFoundError("No Advertiser Found");
    return new response(true, advertiser, "Advertiser found", 200);
  };
  //Update Advertiser
  public updateAdvertiserService = async (
    email: string,
    advertiserData: IAdvertiserUpdateDTO
  ) => {
    const {
      newEmail,
      name,
      username,
      password,
      phone_number,
      link_to_website,
      hotline,
      about,
      logo,
      company_profile,
    } = advertiserData;
    let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);  // Await bcrypt.hash here
  }
    const advertiserUser = await this.userModel.findOneAndUpdate(
      { email: email, role: UserRoles.Advertiser },
      {
        email: newEmail,
        name: name,
        username: username,
        password: hashedPassword,
        phone_number: phone_number,
      },
      { new: true }
    );
    if (advertiserUser instanceof Error) {
      throw new InternalServerError("Internal server error");
    }
    if (advertiserUser == null) {
      throw new NotFoundError("No Advertiser with this email");
    }

    const advertiser = await this.advertiserModel.findOneAndUpdate(
      { user_id: advertiserUser._id },
      {
        link_to_website: link_to_website,
        hotline: hotline,
        about: about,
        logo: logo,
        company_profile: company_profile,
      },
      { new: true }
    );

    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    if (advertiser == null) throw new NotFoundError("No Advertiser Found");
    return new response(true, advertiser, "Advertiser updated", 200);
  };
  //Delete Advertiser
  public deleteAdvertiserService = async (email: string) => {
    const advertiserUser = await this.userModel.findOneAndDelete({
      email: email,
      role: UserRoles.Advertiser,
    });
    if (advertiserUser instanceof Error) {
      throw new InternalServerError("Internal server error");
    }
    if (advertiserUser == null) {
      throw new NotFoundError("No Advertiser with this email");
    }
    const user_id = advertiserUser._id;
    const advertiser = await this.advertiserModel.findOneAndDelete({
      user_id: user_id,
    });

    if (advertiser instanceof Error)
      throw new InternalServerError("Internal server error");
    if (advertiser == null) throw new NotFoundError("No Advertiser Found");
    return new response(true, null, "Advertiser deleted", 200);
  };
}
