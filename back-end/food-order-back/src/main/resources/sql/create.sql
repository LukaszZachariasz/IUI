-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Czas generowania: 30 Sty 2020, 00:53
-- Wersja serwera: 5.7.28
-- Wersja PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `iui_db`
--
CREATE DATABASE IF NOT EXISTS `iui_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;
USE `iui_db`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `billing_address`
--

DROP TABLE IF EXISTS `billing_address`;
CREATE TABLE IF NOT EXISTS `billing_address` (
  `id` bigint(20) NOT NULL,
  `billing_apartment_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `billing_city` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `billing_house_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `billing_name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `billing_street` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `billing_zip_code` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjg6ji2vsfuqlc9vhvy4yi449h` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `billing_address`
--

INSERT INTO `billing_address` (`id`, `billing_apartment_nr`, `billing_city`, `billing_house_nr`, `billing_name`, `billing_street`, `billing_zip_code`, `order_id`) VALUES
(453, 'Kielce', 'Kielce', '', 'ING', 'Uliczna', '33-333', 452),
(463, 'Kielce', 'Kielce', '', 'ING', 'Uliczna', '33-333', 462);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
  `id` bigint(20) NOT NULL,
  `qty` int(11) NOT NULL,
  `subtotal` decimal(19,2) DEFAULT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  `shopping_cart_id` bigint(20) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcro8349ry4i72h81en8iw202g` (`food_id`),
  KEY `FKen9v41ihsnhcr0i7ivsd7i84c` (`order_id`),
  KEY `FKe89gjdx91fxnmkkssyoim8xfu` (`shopping_cart_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `cart_item`
--

INSERT INTO `cart_item` (`id`, `qty`, `subtotal`, `food_id`, `shopping_cart_id`, `order_id`) VALUES
(442, 4, '64.00', 434, NULL, 452),
(444, 3, '36.00', 438, NULL, 452),
(446, 5, '135.00', 426, NULL, 452),
(456, 4, '64.00', 434, NULL, 462),
(458, 3, '36.00', 438, NULL, 462),
(460, 5, '135.00', 426, NULL, 462);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `food`
--

DROP TABLE IF EXISTS `food`;
CREATE TABLE IF NOT EXISTS `food` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_polish_ci,
  `kcal` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `price` float DEFAULT NULL,
  `weight` bigint(20) DEFAULT NULL,
  `percent_of_fat` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `food`
--

INSERT INTO `food` (`id`, `active`, `category`, `description`, `kcal`, `name`, `price`, `weight`, `percent_of_fat`) VALUES
(438, b'1', 'Breakfast', 'Nieduże, Smażone Na Złoty Kolor Placuszki Sporządzone Na Bazie Mąki, Mleka Świeżego Lub Zsiadłego Oraz Drożdży Lub Jaj. Potrawa Tradycyjna W Kuchni Polskiej. Typowe Racuchy Są Niewielkimi Placuszkami Z Jabłkiem Krojonym Lub Startym Na Tarce (Czasem Z Dodatkiem Cynamonu Lub Goździków), Albo Z Rabarbarem Lub Śliwkami. Istnieją Też Wariacje Bardziej Dla Obszaru Polski Egzotyczne – Z Bananem Lub Bakaliami. Podawane Na Słodko, Posypane Cukrem Pudrem Lub Ze Śmietaną, Ewentualnie Z Marmoladą. Na Podlasiu Podawane Są Podczas Wieczerzy Wigilijnej. Racuchy Z Jabłek Posypane Cukrem Pudrem. Zestaw Zawiera 4 Racuchy.', 434, 'Racuchy', 12, 152, 61),
(435, b'1', 'Breakfast', 'Potrawa W Formie Placka, Przyrządzana Ze Smażonych Jaj. Omlety Były Już Znane W Starożytnym Rzymie, Ale Dopiero Francuzi Udoskonalili I Urozmaicili Ich Smak. Do Polskiej Kuchni Trafiły Za Sprawą Marysieńki Sobieskiej, Która Rozpowszechniła Je W Czasie Swoich Licznych Podróży Po Kraju. Omlet Z Cukrem Pudrem Polany Dżemem Truskawkowym.', 542, 'Omlet Na Słodko', 9, 114, 57),
(436, b'1', 'Breakfast', 'Kromka Pieczywa Pszennego, Podpieczona W Tosterze, Rodzaj Grzanki. Gotowy Tost Powinien Być Lekko Przyrumieniony I Chrupiący. Tosty Podaje Się Na Ciepło. Pieczywo Przeznaczone Specjalnie Do Wyrobu Tostów To Tzw. „Chleb Tostowy”. Charakteryzuje Się On Miękkim I Elastycznym Miękiszem, Który Po Odpieczeniu W Tosterze Staje Się Chrupiący, Oraz Bardzo Cienką Skórką. Chleb Tostowy Z Nałożonym Plastrem Sera Żółtego, Plaster Szynki Oraz Drugim Plastrem Sera. Zestaw Zawiera 4 Tosty.', 501, 'Tosty Z Serem ', 8, 100, 18),
(437, b'1', 'Breakfast', 'Proste Danie Mączne Smażone Na Patelni. Podane Naleśniki Można Posypać Cukrem, Cukrem Pudrem Lub Polać Sosem, Choć Najczęściej Podaje Się Je Z Nadzieniem, Np. Z Powidłami, Pokrojonymi Owocami, Dżemem, Twarogiem Lub Czasami Z Parówką I Żółtym Serem. Naleśniki Można Również Podawać Z Farszem Mięsnym, Warzywnym Lub Grzybowym Oraz Z Wieloma Innymi Dodatkami, Wtedy Jednak Po Zwinięciu I Obsmażeniu Nazywa Się Je Krokietami. Kakaowe Naleśniki Z Kremem Z Nadzieniem Serowym Z Kawałkami Banana. Zestaw Zawiera 2 Naleśniki.', 550, 'Kakaowe Naleśniki ', 14, 310, 30),
(429, b'1', 'Supper', 'Potrawa Sporządzana Głównie Ze Świeżych Warzyw, Często Z Dodatkiem Innych Składników, Także Poddanych Uprzednio Obróbce Cieplnej, Oraz Przypraw, Z Dodatkiem Sosu Na Bazie Majonezu, Oliwy, Śmietany Czy Specjalnych Sosów (Dressingów). Sałatka Z Malinami, Skropionym Sokiem Z Cytryny Awokado I Ricottą Polana Sosem (Składniki Sosu: Miód, Sok Z Cytryny, Oliwa, Sól Oraz Pieprz).', 543, 'Sałatka Z Malinami', 12, 157, 2),
(430, b'1', 'Supper', 'Potrawa Sporządzana Głównie Ze Świeżych Warzyw, Często Z Dodatkiem Innych Składników, Także Poddanych Uprzednio Obróbce Cieplnej, Oraz Przypraw, Z Dodatkiem Sosu Na Bazie Majonezu, Oliwy, Śmietany Czy Specjalnych Sosów (Dressingów). Sałatka Z Kurczakiem W Marynacie (Składniki Marynaty: Oliwa, Sok Z Cytryny, Woda, Ocet Balsamiczny, Posiekaną Natka Pietruszki, Suszona Bazylia, Oregano, Przeciśnięty Przez Praskę Czosnek, Sól, Cukier I Pieprz) Z Sałatą, Pomidorem, Ogórkiem, Cebulą, Oliwkami I Awokado.', 539, 'Sałatka Z Kurczakiem', 17, 170, 9),
(431, b'1', 'Supper', 'Kanapki Z Pastą Twarogową (Twaróg Z Jogurtem), Ogórkiem Kiszonym I Szczypiorkiem Doprawione Pieprzem I Solą. Bułka Ciemna Ze Słonecznikiem. Zestaw Zawiera 2 Kanapki.', 460, 'Kanapki Z Twarożkiem', 9, 160, 10),
(432, b'1', 'Supper', 'Klasyczny Włoski Makaron Z Rejonu Emilia-Romagna W Kształcie Długich, Płaskich Wstążek O Grubości Ok. 2 Mm I Szerokości 0,65-1 Cm. Kształtem Przypomina Fettuccine, Lecz Jest Od Niego Szerszy. Tagliatelle Podaje Się Zwykle Z Sosami, Zazwyczaj Z Bolognese. Makaron Z Pesto Z Rukoli (Składniki Pesto: Rukola, Starty Ser Grana Padano, Orzeszki Pinii, Obrany Czosnek, Miód, Sok Z Cytryny, Oliwa, Sól I Pieprz).', 553, 'Makaron Tagliatelle ', 11, 190, 28),
(433, b'1', 'Breakfast', 'Zupa Lub Kleik Przyrządzony Z Płatków Owsianych I Mleka Lub Wody. W Innym Znaczeniu Owsianka To Krupnik Z Kaszy Owsianej. Płatki Owsiane Z Pokrojoną Na Małe Kawałki Połową Gruszki I Orzechami Nerkowca Zalane Mlekiem.', 480, 'Owsianka Z Gruszką ', 8, 77, 4),
(434, b'1', 'Breakfast', 'Rodzaj Kanapki Wykonanej Z Okrągłego Płaskiego Chlebka (Np. Meksykańska Tortilla, Arabska Pita Lub Ormiański Lawasz) Z Zawiniętym W Środku Nadzieniem. Wrap Różni Się Od Kanapki Tym, Że Całkowicie Spowija Nadzienie. Natomiast Kanapka Składa Się Z Wyraźnie Widocznych Dwóch Warstw – Górnej I Dolnej. We Wrapie Nadzienie Z Reguły Składa Się Z Pokrojonego W Plastry Mięsa, Drobiu Lub Ryby Na Zimno Wraz Z Rozdrobnioną Sałatą, Pomidorami Pokrojonymi W Kostkę, Smażonymi Pieczarkami, Boczkiem, Cebulą, Serem I Sosem. Wrapy Z Pomidorem Krojonym W Plastry, Cebulą Krojoną W Piórka, Roztopionymi Plasterkami Sera Żółtego, Sałatą, Majonezem, Ketchupem I Szynką. Wrapy Zapiekane  W Opiekaczu. Zestaw Zawiera 2 Wrapy.', 530, 'Wrapy Z Jajkiem ', 16, 194, 24),
(417, b'1', 'Lunch', 'Wilgotne I Mocno Czekoladowe Muffiny  Z Dużą Zawartością Kako Posypane Mleczną Czekoladą. Porcja Zawiera 4 Sztuki Muffinek. ', 528, 'Czekoladowe Muffinki', 20, 348, 23),
(418, b'1', 'Lunch', 'Naleśnik Z Dodatkiem Syropu Klonowego I Bananów. Porcja Zawiera 4 Sztuki. ', 486, 'Pancakes', 17.9, 373, 15),
(419, b'1', 'Lunch', 'Ciasto Drożdżowe W Kształcie Gwiazdy Z Dodatkiem Masy Makowej Z Bakaliami, Polane Lukrem Cytrynowym.', 466, 'Drożdżowa Gwiazda ', 14, 392, 14),
(420, b'1', 'Lunch', 'Pudding Z Nasionami Chi, Mango, Kiwi I Nasionami Granatu. Cena Odnosi Się Do Jednego Kubka.', 422, 'Pudding Chia', 8, 59, 10),
(421, b'1', 'Dinner', 'Zmielony Indyk, Doprawiony Solą, Pieprzem, Suszonym Oregano, Bazylią Oraz Słodką I Ostrą Papryką Z Passatą, Pokrojonymi W Plasterki Oliwkami Oraz Kawałkami Sera Camembert. ', 488, 'Makaron Z Passatą', 19.9, 258, 14),
(422, b'1', 'Dinner', 'Zupa Z Ziemniakami Krojonymi W Grubą Kostkę Z Dodatkiem Liścia Laurowego, Ziela Angielskiego I Ziarenek Czarnego Pieprzu Z Cebulą I Boczkiem.', 476, 'Zupa Ziemniaczana', 16.5, 110, 21),
(423, b'1', 'Dinner', 'Pierś Z Indyka Polana Sosem Przyprawionym: Solom, Pieprzem, Słodką I Ostrą Papryką, Suszonym Majerankiem, Suszoną Kolendrą Oraz Przeciśnięty Przez Praskę Czosnkiem. Dodatkowo Kopytka Z Buraczkami Z Chrzanem.', 452, 'Pieczona Pierś Z Indyka ', 26.5, 308, 11),
(424, b'1', 'Dinner', 'Kurczak Pokrojony W Kostkę. Doprawiony Solą I Pieprzem Z Sosem Składającym Się Z: Octu Ryżowego, Syropu Z Puszki, Ketchupu, Sosu Sojowego, Cukru Trzcinowego, Przeciśnięty Przez Praskę Czosnku, Papryki, Cebuli, Ananasa I Kiełka Fasoli Mung.', 435, 'Kurczak W Sosie ', 20, 274, 8),
(425, b'1', 'Dinner', 'Ryba Skropiona Sokiem Z Cytryny, Doprawiona Solą, Pieprzem I Suszonym Koperkiem Ze Szparagami I Sosem Cytrynowym (Skład Sosu: Cebula, Czerwone Wino, Sok Z Cytryny, Sól, Miód).', 571, 'Pstrąg Tęczowy ', 29.99, 198, 31),
(426, b'1', 'Dinner', 'Rodzaj Potrawy Mięsnej. Przygotowuje Się Ją Przez Zawinięcie Farszu W Kawałek Mięsa. Tradycyjnie Była To Wołowina, Ale Można Spotkać Też Rolady Robione Z Użyciem Innego Mięsa. Składniki Farszu Różnią Się W Zależności Od Regionu. Roladka Z Filetem Posypanym Przyprawą Do Mięs, Słodką Papryką I Pieprzem, Liśćmi Szpinaku, Plastrem Mozzarelli I Suszonymi Pomidorami, Zawinięta Cienkim Plastrem Boczku. W Zestawie Buraczki I Ziemniaki Polane Sosem Z Pieczenia Z Dodatkiem Śmietany 30%, Musztardy, Pietruszki, Soli, Pieprzu I Czosnku Granulowanego.', 479, 'Roladki Drobiowe ', 27, 232, 18),
(427, b'1', 'Supper', 'Potrawa W Formie Placka, Przyrządzana Ze Smażonych Jaj. Omlety Były Już Znane W Starożytnym Rzymie, Ale Dopiero Francuzi Udoskonalili I Urozmaicili Ich Smak. Do Polskiej Kuchni Trafiły Za Sprawą Marysieńki Sobieskiej, Która Rozpowszechniła Je W Czasie Swoich Licznych Podróży Po Kraju. Omlet Z Indykiem, Pieczarkami, Cebulą, Marchewką, Brokułami, Pędami Cebuli , Solą, Pieprzem, Posiekaną Natką Pietruszki I Ketchupem.', 563, 'Omlet Z Indykiem', 19, 144, 38),
(428, b'1', 'Supper', 'Gatunek Byliny Należący Do Rodziny Powojowatych, Znany Pod Nazwami: Batat, Patat, Kūmara Lub Słodki Ziemniak. Pochodzi Z Ameryki Południowej I Ameryki Środkowej. Nie Jest Znany W Dzikim Stanie, Jest Natomiast Popularny W Uprawie W Całej Strefie Tropikalnej. Spożywane Są Po Ugotowaniu Lub Upieczeniu. Wytwarza Się Z Nich Również Mąkę, Płatki, Skrobię Oraz Alkohol. Zawierają Dużą Ilość Skrobi (Ok. 20%) Oraz Cukrów (Ok. 3%). Słodkie Ziemniaki Są Bogate W Węglowodany Złożone I Błonnik. Są Cennym Źródłem Witamin I Mikroelementów, Takich Jak Witamina A, C Oraz Witaminy Z Grupy B (B1, B2, B6). Bataty Są Także Źródłem Β-Karotenu I Polifenoli, Które Stanowią Naturalne Przeciwutleniacze. Bataty Z Cicierzycą Doprawioną Czosnkiem Granulowanym I Mielonym Imbirem Wraz Z Pastą Tahini (Pastę Sezamową) Ze Startym, Świeżym Imbirem, Czosnkiem, Octem Ryżowym, Sosem Sriracha I Posiekaną Zieloną Cebulką. Zestaw Składa Się Z 2 Sztuk Batatów.', 450, 'Bataty Z Chrupiącą ', 16, 158, 12),
(415, b'1', 'Lunch', 'Kulki Z Rodzynkami, Daktylami, Migdałami, Orzechami Laskowymi I Kawałkami Suszonych Jabłek Z Cynamonem I Płatkami Owsianymi. Jedna Porcja Składa Się Z 5 Kulek.', 301, 'Fit Kulki', 19.9, 175, 7),
(416, b'1', 'Lunch', 'Ciasto Z Kruszonki Z Zapieczonymi Nektarynkami. ', 543, 'Nektarynki Zapiekane ', 16, 392, 27);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `food_to_cart_item`
--

DROP TABLE IF EXISTS `food_to_cart_item`;
CREATE TABLE IF NOT EXISTS `food_to_cart_item` (
  `id` bigint(20) NOT NULL,
  `cart_item_id` bigint(20) DEFAULT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKglfn0hbdvdmoyysc6geun5tou` (`cart_item_id`),
  KEY `FKcn242h0y7ba1pw0fq74w3h9oh` (`food_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `food_to_cart_item`
--

INSERT INTO `food_to_cart_item` (`id`, `cart_item_id`, `food_id`) VALUES
(443, 442, 434),
(445, 444, 438),
(447, 446, 426),
(457, 456, 434),
(459, 458, 438),
(461, 460, 426);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(466),
(466);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payment_order`
--

DROP TABLE IF EXISTS `payment_order`;
CREATE TABLE IF NOT EXISTS `payment_order` (
  `id` bigint(20) NOT NULL,
  `card_name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `card_number` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `cvc` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `default_payment` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `billing_address_id` bigint(20) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtpgkhjjq1acdhd7j3ns2cfric` (`billing_address_id`),
  KEY `FKq3p5lb6tfyt2xg8m7nconfbpi` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `payment_order`
--

INSERT INTO `payment_order` (`id`, `card_name`, `card_number`, `cvc`, `default_payment`, `type`, `billing_address_id`, `order_id`) VALUES
(454, 'Moja Karta Do Jedzonka', '32343', '121', 'true', 'discover', NULL, 452),
(464, 'Moja Karta Do Jedzonka', '32343', '121', 'true', 'discover', NULL, 462);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
(2, 'ROLE_USER'),
(1, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shipping_address`
--

DROP TABLE IF EXISTS `shipping_address`;
CREATE TABLE IF NOT EXISTS `shipping_address` (
  `id` bigint(20) NOT NULL,
  `shipping_apartment_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `shipping_city` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `shipping_default` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `shipping_house_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `shipping_name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `shipping_street` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `shipping_zip_code` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKatbgaqk1hhhhkyyuebylpeh7q` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `shipping_address`
--

INSERT INTO `shipping_address` (`id`, `shipping_apartment_nr`, `shipping_city`, `shipping_default`, `shipping_house_nr`, `shipping_name`, `shipping_street`, `shipping_zip_code`, `order_id`) VALUES
(455, '3', 'Kielce', NULL, '12', 'Mój Adres', 'Studencka', '33-33', 452),
(465, '3', 'Kielce', NULL, '12', 'Mój Adres', 'Studencka', '33-33', 462);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE IF NOT EXISTS `shopping_cart` (
  `id` bigint(20) NOT NULL,
  `grand_total` decimal(19,2) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK254qp5akhuaaj9n5co4jww3fk` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `shopping_cart`
--

INSERT INTO `shopping_cart` (`id`, `grand_total`, `user_id`) VALUES
(439, '0.00', 440);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `height` double DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `bmi` double DEFAULT NULL,
  `health_status` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `daily_total_kcal` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `date_of_birth`, `email`, `enabled`, `firstname`, `height`, `lastname`, `password`, `phone_number`, `username`, `weight`, `gender`, `bmi`, `health_status`, `daily_total_kcal`) VALUES
(440, '1991-01-31', 'lukaszzachariasz.contactme@gmail.com', b'1', 'Łukas', 180, 'Zach', '$2a$12$9F0OMoGZG9NF5XEVpYr2CO5dlTxtOCQrlMHitcwibb/0MfOih94f2', '6564564', 'User', 75, 'Male', 23.148148148148145, 'GW', 1734.74),
(410, '1988-01-30', 'lukaszzachaaariasz.contactme@gmail.com', b'1', 'Łukasz', 180, 'Zachariasz', '$2a$12$F2sIydblsrydn12VBZ54HuT1PgYBSikwQrPFA1ZpjLxEhCvWctXES', '7765566776', 'Lukasz', 65, 'Male', 20.061728395061728, 'GW', 1616.06);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_billing`
--

DROP TABLE IF EXISTS `user_billing`;
CREATE TABLE IF NOT EXISTS `user_billing` (
  `id` bigint(20) NOT NULL,
  `apartment_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `house_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `zip_code` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_payment_id` bigint(20) DEFAULT NULL,
  `user_billing_apartment_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_billing_city` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_billing_country` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_billing_house_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_billing_name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_billing_street` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_billing_zip_code` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3v6hd7snyc3g9s72u41k1fydu` (`user_payment_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_billing`
--

INSERT INTO `user_billing` (`id`, `apartment_nr`, `city`, `country`, `house_nr`, `name`, `street`, `zip_code`, `user_payment_id`, `user_billing_apartment_nr`, `user_billing_city`, `user_billing_country`, `user_billing_house_nr`, `user_billing_name`, `user_billing_street`, `user_billing_zip_code`) VALUES
(450, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 451, '', 'Kielce', NULL, '', 'ING', 'Uliczna', '33-333');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_order`
--

DROP TABLE IF EXISTS `user_order`;
CREATE TABLE IF NOT EXISTS `user_order` (
  `id` bigint(20) NOT NULL,
  `order_date` datetime DEFAULT NULL,
  `order_status` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `order_total` decimal(19,2) DEFAULT NULL,
  `shipping_date` datetime DEFAULT NULL,
  `shipping_method` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `billing_address_id` bigint(20) DEFAULT NULL,
  `payment_order_id` bigint(20) DEFAULT NULL,
  `shipping_address_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbaytj4l2p74kc5dp2dcrhucjo` (`billing_address_id`),
  KEY `FK75afmlo5exdbxvihl2do3lyum` (`payment_order_id`),
  KEY `FKo2lj94xaujs1se8whlhc37nj7` (`shipping_address_id`),
  KEY `FKj86u1x7csa8yd68ql2y1ibrou` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_order`
--

INSERT INTO `user_order` (`id`, `order_date`, `order_status`, `order_total`, `shipping_date`, `shipping_method`, `billing_address_id`, `payment_order_id`, `shipping_address_id`, `user_id`) VALUES
(452, '2020-01-30 00:20:35', 'created', '235.00', NULL, 'groundShipping', 453, 454, 455, 440),
(462, '2020-01-30 00:24:48', 'created', '235.00', NULL, 'groundShipping', 463, 464, 465, 440);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_payment`
--

DROP TABLE IF EXISTS `user_payment`;
CREATE TABLE IF NOT EXISTS `user_payment` (
  `id` bigint(20) NOT NULL,
  `card_name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `card_number` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `cvc` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `default_payment` bit(1) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8fb9fr82lb1qk2cw55ito9rk6` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_payment`
--

INSERT INTO `user_payment` (`id`, `card_name`, `card_number`, `cvc`, `default_payment`, `type`, `user_id`) VALUES
(451, 'Moja Karta Do Jedzonka', '32343', '121', b'1', 'discover', 440);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `user_role_id` bigint(20) NOT NULL,
  `role_role_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `FKotxvofgf4qtsunbe0i3vhady6` (`role_role_id`),
  KEY `FK859n2jvi8ivhui0rl0esws6o` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_role`
--

INSERT INTO `user_role` (`user_role_id`, `role_role_id`, `user_id`) VALUES
(411, 1, 410),
(441, 2, 440);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_shipping`
--

DROP TABLE IF EXISTS `user_shipping`;
CREATE TABLE IF NOT EXISTS `user_shipping` (
  `id` bigint(20) NOT NULL,
  `user_shipping_apartment_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_shipping_city` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_shipping_default` bit(1) DEFAULT NULL,
  `user_shipping_house_nr` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_shipping_name` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_shipping_street` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_shipping_zip_code` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9hidca5hndj9y0b5jb0xtpn9u` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_shipping`
--

INSERT INTO `user_shipping` (`id`, `user_shipping_apartment_nr`, `user_shipping_city`, `user_shipping_default`, `user_shipping_house_nr`, `user_shipping_name`, `user_shipping_street`, `user_shipping_zip_code`, `user_id`) VALUES
(448, '3', 'Kielce', b'1', '12', 'Mój Adres', 'Studencka', '33-33', 440),
(449, '1', 'Kielce', b'1', '55', 'Domowy', 'Krakowska', '22-333', 440);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
