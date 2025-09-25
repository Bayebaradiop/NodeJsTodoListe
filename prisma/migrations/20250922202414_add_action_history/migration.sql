-- CreateTable
CREATE TABLE `ActionHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` ENUM('CREATE', 'READ', 'UPDATE', 'DELETE') NOT NULL,
    `details` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `ActionHistory_taskId_idx`(`taskId`),
    INDEX `ActionHistory_userId_idx`(`userId`),
    INDEX `ActionHistory_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActionHistory` ADD CONSTRAINT `ActionHistory_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActionHistory` ADD CONSTRAINT `ActionHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
