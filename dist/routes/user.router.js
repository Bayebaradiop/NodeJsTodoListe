import { Router } from "express";
import { inscription, login } from "../controllers/user.controller.js";
const router = Router();
router.post("/", inscription);
router.post("/auth", login);
export default router;
//# sourceMappingURL=user.router.js.map