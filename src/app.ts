import express from 'express';
import classeRoutes from "./routes/task.router.js";
import authenticate from "./middlewares/auth.middleware.js";
import userRoutes from "./routes/user.router.js"
import path from "path";
import cookieParser from "cookie-parser";
export const app = express();

app.use(express.json());
app.use("/api/users",userRoutes)
app.use(cookieParser());

app.use(authenticate)
app.use("/api/tasks", classeRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

export default app;