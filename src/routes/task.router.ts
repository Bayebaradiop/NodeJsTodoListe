import { Router } from "express";
import {
  getAllClasses,
  getClasseById,
  createClasse,
  updateClasse,
  deleteClasse,
  Addpermission
  
} from "../controllers/task.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import { Autorisation } from "../middlewares/autorisation.middleweare.js";

const router = Router();
import upload from "../middlewares/upload.middleware.js";

router.get("/",getAllClasses);
router.get("/:id", getClasseById);
router.post("/", authenticate, upload.single("photo"), createClasse);
router.put("/:id", authenticate, upload.single("photo"), Autorisation.permission, updateClasse);
router.delete("/:id", authenticate, Autorisation.permission, deleteClasse);
router.post("/:id/permission", authenticate, Addpermission);

export default router;


