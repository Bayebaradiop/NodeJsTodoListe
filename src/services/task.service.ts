import { PrismaClient } from "@prisma/client";

import { TaskRepository, type TaskCreate, type TaskUpdate } from "../repositories/taskrepository.js";


const prisma = new PrismaClient();

const taskrepository = new TaskRepository();

export class TaskService {
  async create(task: TaskCreate) {
    return await taskrepository.create(task);
  }

  async findAll() {
    return await taskrepository.findAll();
  }

  async findAllPaginated(page = 1, limit = 10) {
    return await taskrepository.findAllPaginated(page, limit);
  }

  async findUserTasks(userId: number) {
    return await taskrepository.findUserTasks(userId);
  }

  async findUserTasksPaginated(userId: number, page = 1, limit = 10) {
    return await taskrepository.findUserTasksPaginated(userId, page, limit);
  }

  async findById(id: number) {
    return await taskrepository.findById(id);
  }

  async update(id: number, task: TaskUpdate) {
    return await taskrepository.update(id, task);
  }

  async delete(id: number) {
    return await taskrepository.delete(id);
  }
  async addPermission(taskId:number,userId:number){
    return await taskrepository.addpermission(taskId,userId);
  }

  async updateEtat(id: number, etat: "ENCOURS" | "TERMINER") {
    return await taskrepository.updateEtat(id, etat);
  }

  calculateDuration(startDate: Date | null, endDate: Date | null): string | null {
    if (!startDate || !endDate) {
      return null;
    }

    const diffMs = endDate.getTime() - startDate.getTime();
    if (diffMs <= 0) {
      return null;
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays}j ${diffHours}h ${diffMinutes}min`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}min`;
    } else {
      return `${diffMinutes}min`;
    }
  }

  async autoCompleteExpiredTasks(tasks: any[]): Promise<any[]> {
    const now = new Date();
    const updatedTasks = [];

    for (const task of tasks) {
      let updatedTask = { ...task };

      if (task.etat !== 'TERMINER' && task.endDate && new Date(task.endDate) < now) {
        try {
          updatedTask = await this.updateEtat(task.id, 'TERMINER');
          updatedTask.autoCompleted = true;
          updatedTask.duration = this.calculateDuration(updatedTask.startDate, updatedTask.endDate);
        } catch (error) {
          console.error(`Erreur lors de l'auto-complétion de la tâche ${task.id}:`, error);
        }
      }

      updatedTasks.push(updatedTask);
    }

    return updatedTasks;
  }


}
