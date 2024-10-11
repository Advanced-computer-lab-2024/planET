import { Router } from "express";
import { ActivityController } from "../controllers/activityController";
import express from "express";
import Container from "typedi";
import authorize from "../middlewares/authorize";
import UserRoles from "@/types/enums/userRoles";
import { FileService } from "@/services/fileService";
const router = Router();

export default (app: Router) => {
  const fileService: FileService = Container.get(FileService);
  app.use("/file", router);

  router.post("/upload", fileService.uploadFile);
};
