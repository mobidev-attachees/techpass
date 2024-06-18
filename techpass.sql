-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 14, 2024 at 08:58 AM
-- Server version: 8.0.27
-- PHP Version: 8.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techpass`
--

-- --------------------------------------------------------

--
-- Table structure for table `storeevent`
--

DROP TABLE IF EXISTS `storeevent`;
CREATE TABLE IF NOT EXISTS `storeevent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eventDescription` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `startTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meetingLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tittle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ticketPrice` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middleName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `websiteLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebookLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagramLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitterLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `storeevent`
--

INSERT INTO `storeevent` (`id`, `eventName`, `eventDescription`, `location`, `country`, `city`, `startDate`, `endDate`, `startTime`, `endTime`, `meetingLink`, `email`, `tittle`, `ticketPrice`, `firstName`, `middleName`, `lastName`, `phoneNumber`, `websiteLink`, `facebookLink`, `instagramLink`, `twitterLink`) VALUES
(1, 'fourteen', 'checking if date will work', 'physical', 'USA', 'New York', '2024-06-28 00:00:00.000', '2024-06-28 00:00:00.000', '15:02', '03:03', '', 'nn@gmail.com', 'Mr.', 'Free', 'Abraham', 'ygyyoiuh', 'Mwatheka', '+254757909044', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/'),
(14, 'Three edited', 'Michaelhouse invites you to an information event to be held Capital Club East Africa, 4 - 7 Floor, Imperial Court, Westlands Road, Nairobi on Thursday 13 June 2024 at 5.30pm.\n\nThe format of t', 'physical', 'Canada', 'Toronto', '2024-06-21 00:00:00.000', '2024-06-21 00:00:00.000', '16:29', '16:29', '', 'nn@gmail.com', 'Mr.', 'Ksh. 2,000 each', 'Abraham', 'ygyyoiuh', 'Mwatheka', '+254757909044', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/'),
(13, 'one', 'another test', 'physical', 'Canada', 'Vancouver', '2024-06-28 00:00:00.000', '2024-06-28 00:00:00.000', '03:18', '15:19', '', 'nn@gmail.com', 'Miss', 'Free', 'Abraham', 'ygyyoiuh', 'Mwatheka', '+254757909044', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/', 'https://getbootstrap.com/docs/5.0/forms/form-control/');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('86463f44-e2dd-477c-a9e9-da8747b83d59', '3ac961c5004b26f1888015389a78b7dc255cee478b08704c15754b4a1b2f72d8', '2024-06-13 12:06:52.255', '20240528130434_init', NULL, NULL, '2024-06-13 12:06:52.232', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
