import { IUserAdminCreateAdminDTO, IUserAdminCreateGovernorDTO } from "@/interfaces/IUser";
import AdminService from "@/services/adminService";
import { Request, Response } from "express";
import Container, { Inject, Service } from "typedi";
import mongoose from "mongoose";

// CRUD for users
@Service()
export class AdminController {
  public async getUsers(req: Request, res: Response): Promise<any> {
    const { page } = req.params;
    const pageNum: number = parseInt(page);
    const adminService: AdminService = Container.get(AdminService);
    const users = await adminService.getUsersService(pageNum);
    res.status(users.status).json({ users });
  }

  public async searchUser(req: Request, res: Response): Promise<any> {
    const { username } = req.params;
    const adminService: AdminService = Container.get(AdminService);
    const user = await adminService.searchUserService(username);
    res.status(user.status).json({ user });
  }

  public async deleteUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const adminService: AdminService = Container.get(AdminService);
    const user = await adminService.deleteUserService(_id);
    res.status(user.status).json({ user });
  }

  public async createGovernor(req: Request, res: Response): Promise<any> {
    const governorData = req.body as IUserAdminCreateGovernorDTO;
    const adminService: AdminService = Container.get(AdminService);
    const newGovernor = await adminService.createGovernorService(governorData);
    res.status(newGovernor.status).json({ newGovernor });
  }

  public async createAdmin(req: Request, res: Response): Promise<any> {
    const adminData = req.body as IUserAdminCreateAdminDTO;
    const adminService: AdminService = Container.get(AdminService);
    const newAdmin = await adminService.createAdminService(adminData);
    res.status(newAdmin.status).json({ newAdmin });
  }

  // --------------------
  // CRUD for categories

  public async createCategory(req: Request, res: Response): Promise<any> {
    const { type } = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const newCategory = await adminService.createCategoryService(type);
    res.status(newCategory.status).json({ newCategory });
  }

  public async getCategories(req: Request, res: Response): Promise<any> {
    const { page } = req.params;
    const pageNum: number = parseInt(page);
    const adminService: AdminService = Container.get(AdminService);
    const categories = await adminService.getCategoriesService(pageNum);
    res.status(categories.status).json({ categories });
  }

  public async updateCategory(req: Request, res: Response): Promise<any> {
    const { oldType, newType } = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const updatedCategory = await adminService.updateCategoryService(oldType, newType);
    res.status(updatedCategory.status).json({ updatedCategory });
  }

  public async deleteCategory(req: Request, res: Response): Promise<any> {
    const { type } = req.body;
    const adminService: AdminService = Container.get(AdminService);
    const deletedCategory = await adminService.deleteCategoryService(type);
    res.status(deletedCategory.status).json({ deletedCategory });
  }
}