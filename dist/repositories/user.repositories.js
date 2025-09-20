import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class userRepository {
    async create(data) {
        return prisma.user.create({
            data
        });
    }
    async findbymail(email) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }
}
//# sourceMappingURL=user.repositories.js.map