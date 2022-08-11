-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: GDSC_wallet
-- ------------------------------------------------------
-- Server version       8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(140) NOT NULL,
  `channel` varchar(20) NOT NULL,
  `channel_id` varchar(140) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `wallet_num` int unsigned DEFAULT NULL,
  `barcode` varchar(12) DEFAULT NULL,
  `elec_invoice_agree` tinyint(1) DEFAULT false,
  `elec_invoice_agree_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `wallet_id` varchar(140) NOT NULL,
  `user_id` varchar(140) DEFAULT NULL,
  `selected` tinyint(1) DEFAULT NULL,
  `wallet_name` varchar(50) DEFAULT NULL,
  `wallet_total` int DEFAULT NULL,
  `wallet_description` varchar(200) DEFAULT NULL,
  `wallet_created_time` datetime DEFAULT NULL,
  `wallet_updated_time` datetime DEFAULT NULL,
  `record_num` int unsigned DEFAULT NULL,
  `wallet_barcode` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`wallet_id`),
  KEY `wallet_ibfk_1` (`user_id`),
  CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wallet_record`
--

DROP TABLE IF EXISTS `wallet_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_record` (
  `record_id` varchar(140) NOT NULL,
  `record_wallet_id` varchar(140) DEFAULT NULL,
  `wallet_record_tag_id` varchar(140) DEFAULT NULL,
  `record_ordinary` int unsigned DEFAULT NULL,
  `record_name` varchar(50) DEFAULT NULL,
  `record_description` varchar(200) DEFAULT NULL,
  `record_amount` int DEFAULT NULL,
  `record_type` varchar(50) DEFAULT NULL,
  `record_date` datetime DEFAULT NULL,
  `record_created_time` datetime DEFAULT NULL,
  `record_updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `record_wallet_id` (`record_wallet_id`),
  CONSTRAINT `wallet_record_ibfk_1` FOREIGN KEY (`record_wallet_id`) REFERENCES `wallet` (`wallet_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wallet_record_tag_id`
--

DROP TABLE IF EXISTS `wallet_record_tag_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_record_tag_id` (
  `tag_id` varchar(140) NOT NULL,
  `tag_wallet_id` varchar(140) DEFAULT NULL,
  `tag_ordinary` int unsigned DEFAULT NULL,
  `tag_name` varchar(50) DEFAULT NULL,
  `tag_type` varchar(50) DEFAULT NULL,
  `tag_created_time` datetime DEFAULT NULL,
  `tag_updated_time` datetime DEFAULT NULL,
  `tag_color` varchar(20) DEFAULT '#BEBEBE',
  PRIMARY KEY (`tag_id`),
  KEY `wallet_record_tag_id_ibfk_1` (`tag_wallet_id`),
  CONSTRAINT `wallet_record_tag_id_ibfk_1` FOREIGN KEY (`tag_wallet_id`) REFERENCES `wallet` (`wallet_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-02 23:36:00
