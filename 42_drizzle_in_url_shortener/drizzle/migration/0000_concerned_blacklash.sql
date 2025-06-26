CREATE TABLE `shortLinks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`shortCode` varchar(25) NOT NULL,
	`url` varchar(255) NOT NULL,
	CONSTRAINT `shortLinks_id` PRIMARY KEY(`id`),
	CONSTRAINT `shortLinks_shortCode_unique` UNIQUE(`shortCode`)
);
