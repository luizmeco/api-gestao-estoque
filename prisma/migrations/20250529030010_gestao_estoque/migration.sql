-- CreateTable
CREATE TABLE `Movimentacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(191) NOT NULL,
    `situacao` VARCHAR(191) NOT NULL,
    `produto` VARCHAR(191) NOT NULL,
    `peso` DOUBLE NOT NULL,
    `valor` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
