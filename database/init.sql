SET NAMES utf8mb4;
USE carcompare;

DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    power_hp INT NOT NULL,
    torque_nm INT NOT NULL,
    weight_kg INT NOT NULL,
    traction ENUM('FWD', 'RWD', 'AWD', '4WD') NOT NULL,
    top_speed_kmh INT DEFAULT NULL,
    category ENUM('Hatch', 'Sedan', 'SUV', 'Pickup', 'Esportivo', 'Elétrico', 'Híbrido') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    fuel_type ENUM('Gasolina', 'Diesel', 'Elétrico', 'Álcool', 'Híbrido') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    km_l_city DECIMAL(5,2) DEFAULT NULL,
    km_l_road DECIMAL(5,2) DEFAULT NULL,

    wh_km_city INT DEFAULT NULL,
    wh_km_road INT DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO cars 
(model, brand, year, power_hp, torque_nm, weight_kg, traction, top_speed_kmh, category, fuel_type, price, image_url,
 km_l_city, km_l_road, wh_km_city, wh_km_road)
VALUES
('Corolla XEI', 'Toyota', 2022, 177, 210, 1300, 'FWD', 210, 'Sedan', 'Álcool', 110000.00, 'images/corolla.jpg', 10, 13, NULL, NULL),
('Golf GTI', 'Volkswagen', 2024, 230, 350, 1350, 'FWD', 245, 'Hatch', 'Gasolina', 150000.00, 'images/golf.jpg', 8, 11, NULL, NULL),
('Model 3', 'Tesla', 2023, 283, 450, 1700, 'RWD', 233, 'Elétrico', 'Elétrico', 250000.00, 'images/tesla.jpg', NULL, NULL, 140, 170),
('i4', 'BMW', 2024, 340, 430, 1800, 'RWD', 225, 'Elétrico', 'Elétrico', 300000.00, 'images/bmw-i4.jpg', NULL, NULL, 170, 200),
('A5', 'Audi', 2016, 252, 370, 1600, 'AWD', 250, 'Esportivo', 'Gasolina', 200000.00, 'images/audi-a5.jpg', 9, 12, NULL, NULL),
('Civic Si', 'Honda', 2008, 197, 189, 1340, 'FWD', 220, 'Sedan', 'Gasolina', 50000.00, 'images/civic-si.jpg', 7, 10, NULL, NULL),
('Civic Touring', 'Honda', 2023, 155, 190, 1250, 'FWD', 200, 'Sedan', 'Gasolina', 120000.00, 'images/civic.jpg', 12, 14, NULL, NULL),
('Skyline R34', 'Nissan', 1999, 276, 392, 1560, 'AWD', 250, 'Esportivo', 'Gasolina', 500000.00, 'images/r34.jpg', 5, 7, NULL, NULL),
('RX-7', 'Mazda', 1992, 276, 314, 1280, 'RWD', 250, 'Esportivo', 'Gasolina', 150000.00, 'images/rx7.jpg', 6, 9, NULL, NULL),
('NSX', 'Honda', 1990, 276, 304, 1350, 'RWD', 270, 'Esportivo', 'Gasolina', 200000.00, 'images/nsx.jpg', 7, 10, NULL, NULL),
('Huracán', 'Lamborghini', 2014, 602, 560, 1422, 'AWD', 325, 'Esportivo', 'Gasolina', 1200000.00, 'images/huracan.jpg', 3, 5, NULL, NULL),
('M3 E46', 'BMW', 2001, 343, 365, 1570, 'RWD', 250, 'Esportivo', 'Gasolina', 100000.00, 'images/bmw-m3.jpg', 6, 9, NULL, NULL),
('AMG GT', 'Mercedes', 2015, 462, 600, 1645, 'RWD', 304, 'Esportivo', 'Gasolina', 500000.00, 'images/amg-gt.jpg', 6, 10, NULL, NULL),
('RS6', 'Audi', 2021, 591, 800, 2075, 'AWD', 305, 'Esportivo', 'Gasolina', 800000.00, 'images/audi-rs6.jpg', 5, 8, NULL, NULL),
('GT-R R35', 'Nissan', 2007, 480, 588, 1740, 'AWD', 315, 'Esportivo', 'Gasolina', 400000.00, 'images/r35.jpg', 5, 8, NULL, NULL),
('Corolla Cross', 'Toyota', 2023, 122, 163, 1450, 'FWD', 180, 'Híbrido', 'Híbrido', 180000.00, 'images/corolla-cross.jpg', 17, 19, NULL, NULL),
('458 Italia', 'Ferrari', 2014, 562, 540, 1380, 'RWD', 325, 'Esportivo', 'Gasolina', 800000.00, 'images/ferrari-458.jpg', 4, 7, NULL, NULL),
('Supra MK4', 'Toyota', 1993, 320, 441, 1570, 'RWD', 250, 'Esportivo', 'Gasolina', 300000.00, 'images/supra.jpg', 5, 8, NULL, NULL),
('Chaser', 'Toyota', 1996, 276, 378, 1460, 'RWD', 240, 'Sedan', 'Gasolina', 100000.00, 'images/chaser.jpg', 7, 10, NULL, NULL),
('Evo IX', 'Mitsubishi', 2005, 286, 392, 1490, 'AWD', 250, 'Sedan', 'Gasolina', 150000.00, 'images/evo9.jpg', 6, 8, NULL, NULL),
('Eclipse GSX', 'Mitsubishi', 1995, 210, 290, 1480, 'AWD', 225, 'Esportivo', 'Gasolina', 80000.00, 'images/eclipse.jpg', 6, 8, NULL, NULL),
('Silvia S15', 'Nissan', 1999, 250, 275, 1260, 'RWD', 230, 'Esportivo', 'Gasolina', 120000.00, 'images/silvia-s15.jpg', 8, 12, NULL, NULL),
('Mustang GT', 'Ford', 2024, 480, 569, 1780, 'RWD', 260, 'Esportivo', 'Gasolina', 350000.00, 'images/mustang.jpg', 6, 9, NULL, NULL),
('Camaro ZL1', 'Chevrolet', 2023, 650, 881, 1760, 'RWD', 322, 'Esportivo', 'Gasolina', 400000.00, 'images/camaro-zl1.jpg', 4, 6, NULL, NULL),
('Hellcat', 'Dodge', 2023, 717, 881, 2000, 'RWD', 327, 'Esportivo', 'Gasolina', 450000.00, 'images/hellcat.jpg', 3, 5, NULL, NULL),
('SS 396', 'Chevrolet', 1967, 375, 563, 1650, 'RWD', 210, 'Esportivo', 'Gasolina', 250000.00, 'images/camaro-ss.jpg', 3, 4, NULL, NULL),
('Charger R/T', 'Dodge', 1970, 425, 664, 1800, 'RWD', 230, 'Esportivo', 'Gasolina', 300000.00, 'images/charger.jpg', 3, 4, NULL, NULL),
('C63 AMG', 'Mercedes', 2015, 503, 700, 1735, 'RWD', 250, 'Sedan', 'Gasolina', 400000.00, 'images/amg-c63.jpg', 6, 9, NULL, NULL),
('R8 V10', 'Audi', 2015, 540, 540, 1630, 'AWD', 330, 'Esportivo', 'Gasolina', 600000.00, 'images/audi-r8.jpg', 4, 7, NULL, NULL),
('SVJ', 'Lamborghini', 2018, 759, 720, 1525, 'AWD', 350, 'Esportivo', 'Gasolina', 2000000.00, 'images/svj.jpg', 2, 4, NULL, NULL),
('911 GT3 RS', 'Porsche', 2023, 518, 465, 1450, 'RWD', 296, 'Esportivo', 'Gasolina', 1500000.00, 'images/gt3rs.jpg', 5, 8, NULL, NULL),
('720S', 'McLaren', 2018, 720, 770, 1419, 'RWD', 341, 'Esportivo', 'Gasolina', 1800000.00, 'images/720s.jpg', 6, 10, NULL, NULL),
('Viper SRT-10', 'Dodge', 2010, 608, 759, 1560, 'RWD', 325, 'Esportivo', 'Gasolina', 1000000.00, 'images/viper.jpg', 4, 7, NULL, NULL),
('Frontier', 'Nissan', 2023, 190, 450, 2050, 'AWD', 180, 'Pickup', 'Diesel', 250000.00, 'images/frontier.jpg', 9, 11, NULL, NULL),
('Hilux SRX', 'Toyota', 2023, 204, 500, 2040, 'AWD', 180, 'Pickup', 'Diesel', 300000.00, 'images/hilux.jpg', 9, 11, NULL, NULL),
('Astra GSI', 'Chevrolet', 2003, 136, 188, 1265, 'FWD', 203, 'Hatch', 'Gasolina', 35000.00, 'images/astra.jpg', 8, 12, NULL, NULL),
('Jetta GLI', 'Volkswagen', 2014, 210, 280, 1400, 'FWD', 240, 'Sedan', 'Gasolina', 120000.00, 'images/jetta.jpg', 9, 13, NULL, NULL),
('Cayman GT4', 'Porsche', 2016, 385, 420, 1340, 'RWD', 295, 'Esportivo', 'Gasolina', 700000.00, 'images/cayman.jpg', 7, 11, NULL, NULL),
('GT', 'Ford', 2010, 550, 678, 1585, 'RWD', 330, 'Esportivo', 'Gasolina', 1500000.00, 'images/ford-gt.jpg', 4, 7, NULL, NULL),
('X3 M', 'BMW', 2020, 503, 650, 1995, 'AWD', 250, 'SUV', 'Gasolina', 650000.00, 'images/bmw-x3m.jpg', 6, 9, NULL, NULL),
('Prius', 'Toyota', 2024, 194, 220, 1450, 'FWD', 180, 'Sedan', 'Híbrido', 185000.00, 'images/prius.jpg', 25, 28, 130, 150);