-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `nomeFantasia` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `CNPJ` VARCHAR(14) NOT NULL,
    `CEP` VARCHAR(10) NOT NULL,
    `logradouro` VARCHAR(10) NOT NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `UF` VARCHAR(2) NOT NULL,
    `complemento` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `cliente_email_key`(`email`),
    UNIQUE INDEX `cliente_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
