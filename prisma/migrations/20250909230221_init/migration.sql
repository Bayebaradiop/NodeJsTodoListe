/*
  Warnings:

  - You are about to drop the `Classe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Eleve` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Eleve` DROP FOREIGN KEY `Eleve_classId_fkey`;

-- DropTable
DROP TABLE `Classe`;

-- DropTable
DROP TABLE `Eleve`;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `etat` ENUM('ENCOURS', 'TERMINER') NOT NULL DEFAULT 'ENCOURS',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
