import { IAdminUpdateDTO, IUserAdminCreateAdminDTO, IUserAdminCreateGovernorDTO } from "@/interfaces/IUser";
import AdminService from "@/services/adminService";
import { Request, Response } from "express";
import Container, { Inject, Service } from "typedi";
import mongoose, { ReplaceOneModel, Types } from "mongoose";
import admin from "../routes/admin";
import ComplaintStatus from "@/types/enums/complaintStatus";

// CRUD for users
@Service()
export class AdminController {
  public async getUsers(req: Request, res: Response): Promise<any> {
    const { page } = req.params;
    const pageNum: number = parseInt(page);
    const adminService: AdminService = Container.get(AdminService);
    const users = await adminService.getUsersService(pageNum);
    res.status(users.status).json(users);
  }

  public async searchUser(req: Request, res: Response): Promise<any> {
    const { username } = req.params;
    const adminService: AdminService = Container.get(AdminService);
    const user = await adminService.searchUserService(username);
    res.status(user.status).json(user);
  }

  public async deleteUser(req: Request, res: Response): Promise<any> {
    const { email } = req.params;
    const adminService: AdminService = Container.get(AdminService);
    const user = await adminService.deleteUserService(email);
    res.status(user.status).json(user);
  }

  public async createGovernor(req: Request, res: Response): Promise<any> {
    const governorData = req.body as IUserAdminCreateGovernorDTO;
    const adminService: AdminService = Container.get(AdminService);
    const newGovernor = await adminService.createGovernorService(governorData);
    res.status(newGovernor.status).json(newGovernor);
  }

  public async createAdmin(req: Request, res: Response): Promise<any> {
    const adminData = req.body as IUserAdminCreateAdminDTO;
    const adminService: AdminService = Container.get(AdminService);
    const newAdmin = await adminService.createAdminService(adminData);
    res.status(newAdmin.status).json(newAdmin);
  }

  // --------------------
  // CRUD for categories

  public async createCategory(req: Request, res: Response): Promise<any> {
    const { type } = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const newCategory = await adminService.createCategoryService(type);
    res.status(newCategory.status).json(newCategory);
  }

  public async getCategories(req: Request, res: Response): Promise<any> {
    const { page } = req.params;
    const pageNum: number = parseInt(page);
    const adminService: AdminService = Container.get(AdminService);
    const categories = await adminService.getCategoriesService(pageNum);
    res.status(categories.status).json(categories);
  }

  public async updateCategory(req: Request, res: Response): Promise<any> {
    const { oldType, newType } = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const updatedCategory = await adminService.updateCategoryService(oldType, newType);
    res.status(updatedCategory.status).json(updatedCategory);
  }

  public async deleteCategory(req: Request, res: Response): Promise<any> {
    const { type } = req.params;
    const adminService: AdminService = Container.get(AdminService);
    const deletedCategory = await adminService.deleteCategoryService(type);
    res.status(deletedCategory.status).json(deletedCategory);
  }

  public async createTag(req: Request, res: Response): Promise<any> {
    const { type } = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const newTag = await adminService.createTagService(type);
    res.status(newTag.status).json(newTag);
  }

  public async getTags(req: Request, res: Response): Promise<any> {
    const { page } = req.params;
    const pageNum: number = parseInt(page);
    const adminService: AdminService = Container.get(AdminService);
    const tags = await adminService.getTagsService(pageNum);
    res.status(tags.status).json(tags);
  }

  public async updateTag(req: Request, res: Response): Promise<any> {
    const { oldType, newType } = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const updatedTag = await adminService.updateTagService(oldType, newType);
    res.status(updatedTag.status).json(updatedTag);
  }

  public async deleteTag(req: Request, res: Response): Promise<any> {
    const { type } = req.params;
    const adminService: AdminService = Container.get(AdminService);
    const deletedTag = await adminService.deleteTagService(type);
    res.status(deletedTag.status).json(deletedTag);
  }
  public async acceptUser(req: Request, res: Response): Promise<any> {
    const { email } = req.params;
    const adminService: AdminService = Container.get(AdminService);
    const acceptedUser = await adminService.acceptUserService(email);
    res.status(acceptedUser.status).json(acceptedUser);
  }

  public async rejectUser(req: Request, res: Response): Promise<any> {
    const { email } = req.params;
    const adminService: AdminService = Container.get(AdminService);
    const rejectedUser = await adminService.rejectUserService(email);
    res.status(rejectedUser.status).json(rejectedUser);
  }
  public async updateAdmin(req: any, res: any) {
    const { email } = req.params;
    const adminUpdateData: IAdminUpdateDTO = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const updatedAdmin = await adminService.updateAdminService(email, adminUpdateData);
    res.status(updatedAdmin.status).json(updatedAdmin);
  }

  public async getComplaints(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const pageNum: number = parseInt(page);
    const adminService: AdminService = Container.get(AdminService);
    const complaints = await adminService.getComplaintsService(pageNum);
    res.status(complaints.status).json(complaints);
  }

  public async getComplaintByID(req: Request, res: Response): Promise<void> {
    const { complaint_id } = req.params;
    const complaintIDObjectId = new Types.ObjectId(complaint_id);
    const adminService: AdminService = Container.get(AdminService);
    const complaint = await adminService.getComplaintByIDService(complaintIDObjectId);
    res.status(complaint.status).json(complaint);
  }

  public async markComplaintResolved(req: Request, res: Response): Promise<void> {
    const { complaint_id } = req.params;
    const complaintIDObjectId = new Types.ObjectId(complaint_id);
    const adminService: AdminService = Container.get(AdminService);
    const complaint = await adminService.markComplaintResolvedService(complaintIDObjectId);
    res.status(complaint.status).json(complaint);
  }

  public async markComplaintPending(req: Request, res: Response): Promise<void> {
    const { complaint_id } = req.params;
    const complaintIDObjectId = new Types.ObjectId(complaint_id);
    const adminService: AdminService = Container.get(AdminService);
    const complaint = await adminService.markComplaintPendingService(complaintIDObjectId);
    res.status(complaint.status).json(complaint);
  }
}
