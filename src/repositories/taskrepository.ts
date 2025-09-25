import { PrismaClient, type User,type Task } from "@prisma/client";
import { getPagination } from "../services/paginator.service.js";
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
  return await prisma.task.findMany({
    include: {
      user: true,
      allowedUsers: true
    }
  });
  }

  async findAllPaginated(page = 1, limit = 10): Promise<{ data: Task[]; total: number }> {
    const { skip, take } = getPagination(page, limit);
    const [data, total] = await prisma.$transaction([
      prisma.task.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { user: true, allowedUsers: true }
      }),
      prisma.task.count()
    ]);

    return { data, total };
  }

  async findUserTasks(userId: number): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { userId: userId }, // Tâches créées par l'utilisateur
          { allowedUsers: { some: { id: userId } } } // Tâches où l'utilisateur a des permissions
        ]
      },
      include: {
        user: true,
        allowedUsers: true
      }
    });
    
    return tasks;
  }

  async findUserTasksPaginated(userId: number, page = 1, limit = 10): Promise<{ data: Task[]; total: number }> {
    const { skip, take } = getPagination(page, limit);
    const where = {
      OR: [
        { userId: userId },
        { allowedUsers: { some: { id: userId } } }
      ]
    };

    const [data, total] = await prisma.$transaction([
      prisma.task.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { user: true, allowedUsers: true }
      }),
      prisma.task.count({ where })
    ]);

    return { data, total };
  }

  async findById(id: number): Promise<Task & {allowedUsers:User[], user: User} | null > {
    return await prisma.task.findUnique({
      where: { id },
      include: {
        allowedUsers: true,
        user: true 
      }
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

async updateEtat(id: number, etat: "ENCOURS" | "TERMINER"): Promise<Task> {
  return await prisma.task.update({
    where: { id },
    data: { etat },
    include: {
      user: true,
      allowedUsers: true
    }
  });
}

}

