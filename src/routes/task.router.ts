import { Router } from "express";
import {
  getTasksbyUser,
  getAllTasks,
  // ...existing imports
  createTasks,
  updateTasks,
  deleteTasks,
  Addpermission,
  updateEtat,
  getTasksById,
  
  
} from "../controllers/task.controller.js";
import { getHistory } from "../controllers/history.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import { Autorisation } from "../middlewares/autorisation.middleweare.js";

const router = Router();
import upload from "../middlewares/upload.middleware.js";

router.get("/", authenticate, getAllTasks);
router.get("/tasksuser", authenticate, getTasksbyUser);
router.get("/history/all", authenticate, getHistory);
router.get("/:id", authenticate, getTasksById);
router.post(
  "/", 
  authenticate, 
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]), 
  createTasks
);

router.put(
  "/:id", 
  authenticate, 
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]), 
  Autorisation.permission, 
  updateTasks
);

router.delete("/:id", authenticate, Autorisation.permission, deleteTasks);
router.post("/:id/permission", authenticate, Addpermission);
router.patch("/:id/etat", authenticate, Autorisation.permission, updateEtat);

export default router;


