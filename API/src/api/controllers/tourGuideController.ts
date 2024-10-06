import { IPreviousWorkInputDTO, IPreviousWorkUpdateDTO } from "@/interfaces/IPrevious_work";
import TourGuideService from "@/services/tourGuideService";
import { Request, Response } from "express";
import Container, { Service } from "typedi";
import { Types } from "mongoose";
import { IItineraryCreateDTO, IItineraryUpdateDTO } from "@/interfaces/IItinerary";
import { ITourGuideInput } from "@/interfaces/ITour_guide";

// TODO the user_id should be taken from the token, and not directly as input from the user
@Service()
export class TourGuideController {
  public async createPreviousWork(req: Request, res: Response): Promise<any> {
    const previousWorkData = req.body as IPreviousWorkInputDTO;
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const newWorkExperience = await tourGuideService.createPreviousWorkService(previousWorkData);
    res.json(newWorkExperience);
  }

  public async updatePreviousWork(req: Request, res: Response): Promise<any> {
    const updatedPreviousWorkData = req.body as IPreviousWorkUpdateDTO;
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const updatedPreviousWork = await tourGuideService.updatePreviousWorkService(updatedPreviousWorkData);
    res.json(updatedPreviousWork);
  }

  public async deletePreviousWork(req: Request, res: Response): Promise<any> {
    const { previous_work_id, tour_guide_user_id } = req.params;
    const _idObjectId = new Types.ObjectId(previous_work_id);
    const tour_guide_idObjectId = new Types.ObjectId(tour_guide_user_id);
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const deletedPreviousWork = await tourGuideService.deletePreviousWorkService(_idObjectId, tour_guide_idObjectId);
    res.json(deletedPreviousWork);
  }
  // ---- Profile ----
  public async createProfile(req: Request, res: Response): Promise<any> {
    const tourGuideData = req.body as ITourGuideInput;
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const tourGuideProfile = await tourGuideService.createProfileService(tourGuideData);
    res.json(tourGuideProfile);
  }
  public async getProfile(req: Request, res: Response): Promise<any> {
    const { tour_guide_user_id } = req.params;
    const tour_guide_idObjectId = new Types.ObjectId(tour_guide_user_id);
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const tourGuideProfile = await tourGuideService.getProfileService(tour_guide_idObjectId);
    res.json(tourGuideProfile);
  }
  public async updateProfile(req: Request, res: Response): Promise<any> {
    const { tour_guide_user_id, years_of_experience, photo } = req.body;
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const updatedProfile = await tourGuideService.updateProfileService(years_of_experience, photo, tour_guide_user_id);
    res.json(updatedProfile);
  }

  // --- CRUD ititnerinay ---

  public async createItinerary(req: Request, res: Response): Promise<any> {
    const itineraryData = req.body as IItineraryCreateDTO;
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const newItinerary = await tourGuideService.createItineraryService(itineraryData);
    res.json(newItinerary);
  }

  public async getItinerary(req: Request, res: Response): Promise<any> {
    const { itinerary_id } = req.params;
    const itinerary_idObjectId = new Types.ObjectId(itinerary_id);
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const newItinerary = await tourGuideService.getItineraryService(itinerary_idObjectId);
    res.json(newItinerary);
  }
  public async updateItinerary(req: Request, res: Response): Promise<any> {
    const itineraryData = req.body as IItineraryUpdateDTO;
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const updatedItinerary = await tourGuideService.updateItineraryService(itineraryData);
    res.json(updatedItinerary);
  }
  public async deleteItinerary(req: Request, res: Response): Promise<any> {
    const { tour_guide_user_id, itinerary_id } = req.params;
    const _idObjectId = new Types.ObjectId(itinerary_id);
    const tour_guide_idObjectId = new Types.ObjectId(tour_guide_user_id);
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const deletedItinerary = await tourGuideService.deleteItineraryService(tour_guide_idObjectId, _idObjectId);
    res.json(deletedItinerary);
  }

  public async viewAllItineraries(req: Request, res: Response): Promise<any> {
    const { tour_guide_user_id } = req.params;
    const tour_guide_idObjectId = new Types.ObjectId(tour_guide_user_id);
    const tourGuideService: TourGuideService = Container.get(TourGuideService);
    const itineraries = await tourGuideService.getAllItinerariesService(tour_guide_idObjectId);
    res.json(itineraries);
  }
}