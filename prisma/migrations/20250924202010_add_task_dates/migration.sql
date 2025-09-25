/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_userId_fkey`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `audio` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL;

-- DropTable
DROP TABLE `History`;
