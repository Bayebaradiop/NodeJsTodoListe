import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { inscription, login, getCurrentUser, logout, getAllUsers } from "../controllers/user.controller.js";
const router = Router();
router.post("/", inscription);
router.post("/auth", login);
router.get("/me", authenticate, getCurrentUser);
router.get("/", authenticate, getAllUsers);
router.post("/logout", logout);
export default router;
//# sourceMappingURL=user.router.js.map