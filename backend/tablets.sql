-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 11. 08:44
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webbolt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `os` varchar(50) DEFAULT NULL,
  `cpu_speed` decimal(3,1) DEFAULT NULL,
  `cores` int(11) DEFAULT NULL,
  `display_size` decimal(3,1) DEFAULT NULL,
  `resolution_x` int(11) DEFAULT NULL,
  `resolution_y` int(11) DEFAULT NULL,
  `ram` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tablets`
--

INSERT INTO `tablets` (`id`, `name`, `os`, `cpu_speed`, `cores`, `display_size`, `resolution_x`, `resolution_y`, `ram`, `price`) VALUES
(1, 'Apple iPad 10.9 2022 64GB', 'Apple iPadOS', 3.0, 6, 10.9, 2360, 1640, 4, 153740),
(2, 'Samsung Galaxy Tab A9 X115 64GB 4G', 'Android', 2.2, 8, 8.7, 1340, 800, 4, 58480),
(3, 'Xiaomi Redmi Pad Pro 6GB+128GB', 'Android', 2.4, 8, 12.1, 2560, 1600, 6, 84980),
(4, 'Apple iPad Air 6 2024 11 128GB', 'Apple iPadOS', 3.0, 8, 11.0, 2360, 1640, 8, 260090),
(5, 'Honor Pad X9 4GB/128GB', 'Android', 2.8, 8, 11.5, 2000, 1200, 4, 69990),
(6, 'Lajos', 'iOs', 3.0, 8, 11.5, 2000, 1200, 4, 95000);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tablets`
--
ALTER TABLE `tablets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
