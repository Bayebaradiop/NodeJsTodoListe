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


  


}
