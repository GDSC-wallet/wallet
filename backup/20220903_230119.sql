-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: wallet
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `debtor`
--

DROP TABLE IF EXISTS `debtor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debtor` (
  `debtor_id` varchar(140) NOT NULL,
  `debtor_user_id` varchar(140) NOT NULL,
  `debtor_name` varchar(50) NOT NULL,
  `debtor_amount` int DEFAULT '0',
  `debtor_created_time` datetime DEFAULT NULL,
  `debtor_updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`debtor_id`),
  KEY `debtor_user_id` (`debtor_user_id`),
  CONSTRAINT `debtor_ibfk_1` FOREIGN KEY (`debtor_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtor`
--

LOCK TABLES `debtor` WRITE;
/*!40000 ALTER TABLE `debtor` DISABLE KEYS */;
INSERT INTO `debtor` VALUES ('debtor3991f0a7-ea5d-47c3-aa4d-e65234b5d934','F9/BQL8NBN0NER+i6klazZn1MNTX82mT747DoXgTEeI=','\'shivey\'',-100,'2022-08-31 08:58:26','2022-08-31 08:58:26'),('debtor746ed876-23dd-4eb5-9bc0-ad8dc0c069aa','F9/BQL8NBN0NER+i6klazZn1MNTX82mT747DoXgTEeI=','\'evan\'',-100,'2022-08-31 08:58:17','2022-08-31 08:58:17'),('debtor884f74c7-e8f0-43ba-a898-44d84dc204eb','F9/BQL8NBN0NER+i6klazZn1MNTX82mT747DoXgTEeI=','\'andy\'',-100,'2022-08-31 08:58:31','2022-08-31 08:58:31');
/*!40000 ALTER TABLE `debtor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debtor_record`
--

DROP TABLE IF EXISTS `debtor_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debtor_record` (
  `debtor_record_id` varchar(140) NOT NULL,
  `debtor_record_amount` int DEFAULT '0',
  `debtor_id` varchar(140) NOT NULL,
  `record_id` varchar(140) NOT NULL,
  PRIMARY KEY (`debtor_record_id`),
  KEY `debtor_record_ibfk_1` (`debtor_id`),
  KEY `debtor_record_ibfk_2` (`record_id`),
  CONSTRAINT `debtor_record_ibfk_1` FOREIGN KEY (`debtor_id`) REFERENCES `debtor` (`debtor_id`) ON DELETE CASCADE,
  CONSTRAINT `debtor_record_ibfk_2` FOREIGN KEY (`record_id`) REFERENCES `wallet_record` (`record_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtor_record`
--

LOCK TABLES `debtor_record` WRITE;
/*!40000 ALTER TABLE `debtor_record` DISABLE KEYS */;
INSERT INTO `debtor_record` VALUES ('debtor_record_848aa75c-a1db-4bc4-9b89-a3c1f8b6abfb',-100,'debtor3991f0a7-ea5d-47c3-aa4d-e65234b5d934','record_36bc0423-1e46-4701-82ef-2cbdb6ebc258'),('debtor_record_e1c30bce-65e6-45c9-bab2-96d6874d6d3c',-100,'debtor746ed876-23dd-4eb5-9bc0-ad8dc0c069aa','record_36bc0423-1e46-4701-82ef-2cbdb6ebc258'),('debtor_record_f4c9f76c-6814-4f12-836d-34ebf36a57a5',-100,'debtor884f74c7-e8f0-43ba-a898-44d84dc204eb','record_36bc0423-1e46-4701-82ef-2cbdb6ebc258');
/*!40000 ALTER TABLE `debtor_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1CuMPXA3cqBJkAE4XarQLINqWDMPjV8p',1662022728,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-09-01T08:57:13.796Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"result\":\"USER_NOT_EXIST_IN_DB\",\"user_id\":\"F9/BQL8NBN0NER+i6klazZn1MNTX82mT747DoXgTEeI=\",\"channel\":\"GOOGLE\",\"channel_id\":\"116992828433867985462\",\"email\":\"109703041@g.nccu.edu.tw\",\"username\":\"邵靖翔\"}}}'),('29rKYIp7xXE_xsjXBhyvdakyXHC-da0j',1662024603,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-09-01T09:30:02.056Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"result\":\"USER_EXIST_IN_DB\",\"user_id\":\"F9/BQL8NBN0NER+i6klazZn1MNTX82mT747DoXgTEeI=\"}}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

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
  `wallet_num` int unsigned DEFAULT '0',
  `barcode` varchar(12) DEFAULT NULL,
  `elec_invoice_agree` tinyint(1) DEFAULT '0',
  `elec_invoice_agree_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('F9/BQL8NBN0NER+i6klazZn1MNTX82mT747DoXgTEeI=','GOOGLE','116992828433867985462','\'109703041@g.nccu.edu.tw\'','邵靖翔','\'royshao\'','2022-08-31 08:57:35','2022-08-31 08:57:35',1,'\'/23WDYYU\'',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

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
  `wallet_total` int DEFAULT '0',
  `wallet_description` varchar(200) DEFAULT NULL,
  `wallet_created_time` datetime DEFAULT NULL,
  `wallet_updated_time` datetime DEFAULT NULL,
  `record_num` int unsigned DEFAULT '0',
  `wallet_barcode` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`wallet_id`),
  KEY `wallet_ibfk_1` (`user_id`),
  CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES ('wallet_599f2751-0688-4980-9623-858f2bf535a4','F9/BQL8NBN0NER+i6klazZn1MNTX82mT747DoXgTEeI=',1,'\'錢包1\'',9500,'\'預設錢包\'','2022-08-31 08:57:35','2022-08-31 08:57:35',2,NULL);
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;

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
  `record_ordinary` int unsigned DEFAULT '0',
  `record_name` varchar(50) DEFAULT NULL,
  `record_description` varchar(200) DEFAULT NULL,
  `record_amount` int DEFAULT '0',
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
-- Dumping data for table `wallet_record`
--

LOCK TABLES `wallet_record` WRITE;
/*!40000 ALTER TABLE `wallet_record` DISABLE KEYS */;
INSERT INTO `wallet_record` VALUES ('record_306881e6-b6e3-43d1-8ca3-1da9eef0f54f','wallet_599f2751-0688-4980-9623-858f2bf535a4','tag_c7045d84-72c4-46fc-abfa-19ad6a4c8e93',1,'\'test\'','\'\'',10000,'income','2022-08-31 00:00:00','2022-08-31 08:57:53','2022-08-31 08:57:53'),('record_36bc0423-1e46-4701-82ef-2cbdb6ebc258','wallet_599f2751-0688-4980-9623-858f2bf535a4','tag_fdbb0f14-0b67-4fad-aa52-c20fb07a330d',1,'\'test\'','\'\'',-500,'expense','2022-08-31 00:00:00','2022-08-31 08:58:48','2022-08-31 08:58:48');
/*!40000 ALTER TABLE `wallet_record` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `wallet_record_tag_id`
--

LOCK TABLES `wallet_record_tag_id` WRITE;
/*!40000 ALTER TABLE `wallet_record_tag_id` DISABLE KEYS */;
INSERT INTO `wallet_record_tag_id` VALUES ('tag_1730262d-e063-4af7-a010-a6644b2d55c4','wallet_599f2751-0688-4980-9623-858f2bf535a4',4,'\'飲料\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#EAAE50'),('tag_2673103f-95bb-49b3-8d5a-b1a5f8ba2c30','wallet_599f2751-0688-4980-9623-858f2bf535a4',5,'\'宵夜\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#C0CB28'),('tag_2b4b253c-e21a-48f8-abfd-97011d0cfb48','wallet_599f2751-0688-4980-9623-858f2bf535a4',2,'\'午餐\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#E98770'),('tag_2c4f9308-b0ad-4d6a-bfc7-f2c4bb1dc6e9','wallet_599f2751-0688-4980-9623-858f2bf535a4',8,'\'其他\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#5CBDB9'),('tag_5a6f87db-a2f3-4f72-8c19-9f84db22207b','wallet_599f2751-0688-4980-9623-858f2bf535a4',10,'\'現金\'','income','2022-08-31 08:57:35','2022-08-31 08:57:35','#525D9A'),('tag_6e80795f-55d4-4ac3-9675-9ffe95f5f60d','wallet_599f2751-0688-4980-9623-858f2bf535a4',12,'\'其他\'','income','2022-08-31 08:57:35','2022-08-31 08:57:35','#B173A3'),('tag_761b9902-aba6-4df7-84be-cd280054075e','wallet_599f2751-0688-4980-9623-858f2bf535a4',3,'\'晚餐\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#EEA26E'),('tag_791cfb5b-f499-4333-995b-bc150b488982','wallet_599f2751-0688-4980-9623-858f2bf535a4',6,'\'交通\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#A6CE83'),('tag_a21e5961-e984-4511-9a15-dff71534c622','wallet_599f2751-0688-4980-9623-858f2bf535a4',11,'\'轉帳\'','income','2022-08-31 08:57:35','2022-08-31 08:57:35','#79629C'),('tag_aecc5180-d750-4fec-84b4-4ff97b407a29','wallet_599f2751-0688-4980-9623-858f2bf535a4',1,'\'早餐\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#E6746A'),('tag_c7045d84-72c4-46fc-abfa-19ad6a4c8e93','wallet_599f2751-0688-4980-9623-858f2bf535a4',9,'\'工作\'','income','2022-08-31 08:57:35','2022-08-31 08:57:35','#5C7FB3'),('tag_fdbb0f14-0b67-4fad-aa52-c20fb07a330d','wallet_599f2751-0688-4980-9623-858f2bf535a4',7,'\'日用品\'','expense','2022-08-31 08:57:35','2022-08-31 08:57:35','#61B98B');
/*!40000 ALTER TABLE `wallet_record_tag_id` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-03 15:01:19
