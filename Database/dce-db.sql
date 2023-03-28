-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 09:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dce-db`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `UuidFromBin` (`_bin` BINARY(16)) RETURNS BINARY(36) DETERMINISTIC SQL SECURITY INVOKER RETURN
        LCASE(CONCAT_WS('-',
            HEX(SUBSTR(_bin,  5, 4)),
            HEX(SUBSTR(_bin,  3, 2)),
            HEX(SUBSTR(_bin,  1, 2)),
            HEX(SUBSTR(_bin,  9, 2)),
            HEX(SUBSTR(_bin, 11))
                 ))$$

CREATE DEFINER=`root`@`localhost` FUNCTION `UuidToBin` (`_uuid` BINARY(36)) RETURNS BINARY(16) DETERMINISTIC SQL SECURITY INVOKER RETURN
        UNHEX(CONCAT(
            SUBSTR(_uuid, 15, 4),
            SUBSTR(_uuid, 10, 4),
            SUBSTR(_uuid,  1, 8),
            SUBSTR(_uuid, 20, 4),
            SUBSTR(_uuid, 25) ))$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `UserId` char(36) NOT NULL,
  `Username` varchar(30) DEFAULT NULL,
  `Email` varchar(20) DEFAULT NULL,
  `FirstName` varchar(20) DEFAULT NULL,
  `LastName` varchar(20) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `OrderId` char(36) NOT NULL,
  `ProductId` char(36) NOT NULL,
  `OrderStatus` int(1) DEFAULT NULL,
  `OrderType` int(1) DEFAULT NULL,
  `OrderBy` char(36) NOT NULL,
  `OrderedOn` datetime DEFAULT NULL,
  `ShippedOn` datetime DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductId` char(36) NOT NULL,
  `ProductName` varchar(50) DEFAULT NULL,
  `UnitPrice` decimal(10,0) DEFAULT NULL,
  `SupplierId` char(36) NOT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `SupplierId` char(36) NOT NULL,
  `SupplierName` varchar(50) NOT NULL,
  `CreatedOn` datetime NOT NULL,
  `IsActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`UserId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`OrderId`),
  ADD KEY `OrderBy` (`OrderBy`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `SupplierId` (`SupplierId`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`SupplierId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`OrderBy`) REFERENCES `customer` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`SupplierId`) REFERENCES `supplier` (`SupplierId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
