-- CreateTable
CREATE TABLE `Metric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreDato` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,
    `unidad` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
