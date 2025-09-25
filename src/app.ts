import express from 'express';
import cors from 'cors';
import classeRoutes from "./routes/task.router.js";
import authenticate from "./middlewares/auth.middleware.js";
import userRoutes from "./routes/user.router.js"
import path from "path";
import cookieParser from "cookie-parser";
import { TaskService } from "./services/task.service.js";
export const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/users",userRoutes)

app.use(authenticate)
app.use("/api/tasks", classeRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Tâche programmée pour l'auto-complétion des tâches expirées
const taskService = new TaskService();

setInterval(async () => {
  try {
    console.log('🔄 Vérification automatique des tâches expirées...');
    const allTasks = await taskService.findAll();

    if (allTasks.length > 0) {
      const expiredTasks = allTasks.filter(task =>
        task.etat !== 'TERMINER' &&
        task.endDate &&
        new Date(task.endDate) < new Date()
      );

      if (expiredTasks.length > 0) {
        console.log(`📅 ${expiredTasks.length} tâche(s) expirée(s) trouvée(s)`);

        for (const task of expiredTasks) {
          try {
            await taskService.updateEtat(task.id, 'TERMINER');
            console.log(`✅ Tâche ${task.id} (${task.titre}) auto-complétée`);
          } catch (error) {
            console.error(`❌ Erreur lors de l'auto-complétion de la tâche ${task.id}:`, error);
          }
        }
      } else {
        console.log('✅ Aucune tâche expirée trouvée');
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification automatique des tâches:', error);
  }
}, 60000); // Toutes les 60 secondes

console.log('🚀 Auto-complétion des tâches activée (vérification toutes les 60 secondes)');

export default app;