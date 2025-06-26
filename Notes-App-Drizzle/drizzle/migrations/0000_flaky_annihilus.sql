CREATE TABLE `notes_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`content` varchar(250) NOT NULL,
	`createdAt` date,
	CONSTRAINT `notes_table_id` PRIMARY KEY(`id`)
);
