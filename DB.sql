-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 27, 2021 at 06:06 AM
-- Server version: 10.4.17-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u669410571_qa_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `commentUserId` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentId`, `questionId`, `commentUserId`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'I think React and N', '2021-04-25 09:35:21', '2021-04-27 01:27:18'),
(3, 2, 3, 'okkkkkk', '2021-04-25 09:35:21', '2021-04-27 01:42:36'),
(5, 3, 2, 'For my experience, I would choose Ontario for jobs, but I love BC more because it is beautiful.', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(6, 4, 5, 'okkk jjj ookkkkk ooookookkk', '2021-04-25 09:35:21', '2021-04-27 01:25:43'),
(7, 5, 1, 'I also never see it before, but am curious how it looks!.', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(8, 6, 3, 'I do not really care haha. what the hell is this? .nah!', '2021-04-25 09:35:21', '2021-04-27 01:52:31'),
(9, 7, 4, 'I would go for Samsung Galaxy S21 . Hey but idk', '2021-04-25 09:35:21', '2021-04-27 03:29:17'),
(10, 7, 1, 'iPhone is my choice', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(12, 4, 2, 'I like all colors lol.', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(13, 2, 3, 'This Fall for sure.', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(15, 9, 1, 'We have can find good Roti in Abbotsford. Just google it!', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(29, 1, 4, 'Testing edit functionality here!', '2021-04-27 04:02:19', '2021-04-27 04:05:50'),
(32, 1, 4, 'okkkk I dont care!!', '2021-04-27 04:04:50', '2021-04-27 04:05:35'),
(33, 1, 4, 'okkkk', '2021-04-27 04:07:50', '2021-04-27 04:07:50'),
(36, 1, 4, 'okkkkk', '2021-04-27 04:10:38', '2021-04-27 04:10:38'),
(39, 1, 4, 'okk', '2021-04-27 04:11:19', '2021-04-27 04:11:19'),
(40, 1, 4, 'kkkkk', '2021-04-27 04:12:42', '2021-04-27 04:12:42');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `questionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`questionId`, `userId`, `title`, `slug`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'What is the best web stack now days....', 'What-is-the-best-web-stack-now-days', 'I am starting to study web development. Can someone give me a hint?', '2021-04-25 09:35:21', '2021-04-27 04:50:09'),
(2, 1, 'When will we go back to UFV', 'When-will-we-go-back-to-UFV', 'It has been a while. \n I miss UFV!', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(3, 2, 'BC vs. Ontario regarding the tech jobs', 'BC-vs-Ontario-regarding-the-tech-jobs', 'Hi, I am about to graduate soon! I want to know whether there are more tech jobs in Ontario. I am living in BC now.', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(4, 3, 'What’s your favorite color?', 'Whats-your-favorite-color', 'For me, I like blue. How about you, guys\n\n\ndasd\n\n\ndasd\n\n\nasda\n', '2021-04-25 09:35:21', '2021-04-26 06:57:25'),
(5, 4, 'Have you ever seen a UFO?', 'Have-you-ever-seen-a-UFO', 'okk', '2021-04-25 09:35:21', '2021-04-26 23:23:20'),
(6, 5, 'What’s your all-time favorite quotes?', 'Whats-your-all-time-favorite-quotes', '\"Think Different\" - from Steve Jobs', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(7, 2, 'Can someone give me the advice for my next phone?', 'Can-someone-give-me-the-advice-for-my-next-phone', 'I am going to upgrade my phone. So any advice please', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(9, 3, 'Places to get Indian Roti bread.', 'Places-to-get-Indian-Roti-bread', 'I like Indian Roti bread. Can someone show me the best place to get Roti?', '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(10, 1, 'What are you studying in COMP 351', 'What-are-you-studying-in-COMP-351', 'I am going to register for COMP 351 in next Fall. Any suggestion?', '2021-04-25 09:35:21', '2021-04-25 09:35:21');

-- --------------------------------------------------------

--
-- Table structure for table `routeStats`
--

CREATE TABLE `routeStats` (
  `method` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endpoint` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `routeStats`
--

INSERT INTO `routeStats` (`method`, `endpoint`, `requestCount`) VALUES
('GET', '/api/v1/comment/id', 1),
('GET', '/api/v1/comments/id', 6),
('GET', '/api/v1/question/id/comments', 1),
('GET', '/api/v1/questions', 4),
('GET', '/api/v1/questions/id', 3),
('GET', '/api/v1/questions/id/comments', 1),
('GET', '/api/v1/questions/slug', 1),
('GET', '/api/v1/users/userName', 4),
('GET', '/api/v1/users/userName/commennts', 1),
('GET', '/api/v1/users/userName/comments', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwd` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePic` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'default.jpeg',
  `backgroundPic` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'default.jpeg',
  `resetPasswordToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resetPasswordExpire` datetime DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `username`, `email`, `passwd`, `role`, `profilePic`, `backgroundPic`, `resetPasswordToken`, `resetPasswordExpire`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', 'johndoe21', 'johnd@gmail.com', '$2a$10$7/Ze1a07ueSHufmMKM6OR.OyI23NOAu9TFFfvheZYzX4pqt7VJ5.K', 'user', 'default.jpeg', 'default.jpeg', NULL, NULL, '2021-04-25 09:35:21', '2021-04-27 03:09:29'),
(2, 'Mary Smith', 'marysmith2', 'mary@gmail.com', '$2a$10$BCURNU9MTFaMs5DtJ0WoYuRARb8zI54PMrewLtpwcxBQPerfale3K', 'user', 'default.jpeg', 'default.jpeg', NULL, NULL, '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(3, 'Hieu Le', 'hieule', 'hieu@gmail.com', '$2a$10$dr52UQ4e6lhUH79NsB0WBeDQg23WSF9/merjH3wODO1I3pDQCPYVe', 'admin', 'default.jpeg', 'default.jpeg', NULL, NULL, '2021-04-25 09:35:21', '2021-04-27 04:42:06'),
(4, 'Gurjit Singh', 'gurjit1', 'gurjit@gmail.com', '$2a$10$oaLf.Rfj9lVcMyREGCdBC.tjxJm8ki7KDH7NOVgT7dE/kJnQIu7D6', 'admin', 'photo_4.JPG', 'default.jpeg', NULL, NULL, '2021-04-25 09:35:21', '2021-04-27 04:53:12'),
(5, 'Jonny Le', 'johnnyle', 'johnny.le@gmail.com', '$2a$10$/2u03L8JushCyoTfxhOytuTIve3Y/LmJIvnsl/hJzmp5UpUQ7OiiO', 'user', 'default.jpeg', 'default.jpeg', NULL, NULL, '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(6, 'Danyal Whitney', 'danyalw', 'danyal@gmail.com', '$2a$10$fobJqEaUsgMgYb68kwHH/e7IehgeXyvXW5cunPbPBrQul7Fk66axC', 'user', 'default.jpeg', 'default.jpeg', NULL, NULL, '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(7, 'Lowri Jacobs', 'lowri1', 'lowri1@gmail.com', '$2a$10$7Qxh.LbkIpGxreB1dIPt.eH5H79IaSlGjq7oaBJ6m8VqJtxDp5lIm', 'user', 'default.jpeg', 'default.jpeg', NULL, NULL, '2021-04-25 09:35:21', '2021-04-25 09:35:21'),
(8, 'Gurjit', 'gurjit', '84gurjits@gmail.com', '$2a$10$3WTMbHonbidfCRJQJQEzi.qIRhPtp7i9NXhZUbDaw8alNRXVNaX/e', 'user', 'default.jpeg', 'default.jpeg', NULL, NULL, '2021-04-26 17:48:54', '2021-04-26 18:09:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `commentUserId` (`commentUserId`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`questionId`),
  ADD UNIQUE KEY `title` (`title`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `routeStats`
--
ALTER TABLE `routeStats`
  ADD PRIMARY KEY (`method`,`endpoint`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`commentUserId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
