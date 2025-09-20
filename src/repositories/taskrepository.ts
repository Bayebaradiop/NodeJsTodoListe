import { PrismaClient, type User,type Task } from "@prisma/client";
import type { Icrud } from "../interfaces/index.js"; 
import { string } from "zod";

const prisma = new PrismaClient();


export type TaskCreate = Omit<Task,"id"> & { userId: number }

export type TaskUpdate = Partial<TaskCreate>;

export class TaskRepository implements Icrud<Task, TaskCreate, TaskUpdate, number> {
  async create(task: TaskCreate): Promise<Task> {
    return await prisma.task.create({
      data: task,
    });
  }

  async findAll(): Promise<Task[]> {
  return await prisma.task.findMany();
  }

  async findById(id: number): Promise<Task & {allowedUsers:User[]} | null > {
    return await prisma.task.findUnique({
      where: { id },
      include:{allowedUsers:true}
    });
  }

  async update(id: number, classe: TaskUpdate): Promise<Task> {
    return await prisma.task.update({
      where: { id },
      data: classe,
    });
  }



  async delete(id: number): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });
  }


async addpermission(taskId:number,userId:number){
  return await prisma.task.update({
    where:{id:taskId},
    data:{
      allowedUsers:{
        connect:{id:userId}
      },
      
    },
    include:{allowedUsers:true}
  })
}

}

