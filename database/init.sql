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
    top_speed_kmh INT NOT NULL,
    category ENUM('Hatch', 'Sedan', 'SUV', 'Pickup', 'Esportivo', 'Elétrico', 'Híbrido') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    fuel_type ENUM('Gasolina', 'Diesel', 'Elétrico', 'Álcool', 'Híbrido') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO cars (model, brand, year, power_hp, torque_nm, weight_kg, traction, top_speed_kmh, category, fuel_type, price, image_url) VALUES
('Civic',       'Honda',       2023, 155, 190, 1250, 'FWD', 200, 'Sedan',     'Gasolina', 120000.00, 'images/civic.jpg'),
('Corolla',     'Toyota',      2022, 177, 210, 1300, 'FWD', 210, 'Sedan',     'Álcool',    110000.00, 'images/corolla.jpg'),
('Golf GTI',    'Volkswagen',  2024, 230, 350, 1350, 'FWD', 245, 'Hatch',     'Gasolina', 150000.00, 'images/golf.jpg'),
('Model 3',     'Tesla',       2023, 283, 450, 1700, 'RWD', 233, 'Elétrico',  'Elétrico', 250000.00, 'images/tesla.jpg'),
('i4',          'BMW',         2024, 340, 430, 1800, 'RWD', 225, 'Elétrico',  'Elétrico', 300000.00, 'images/bmw.jpg'),
('A5',          'Audi',        2016, 252, 370, 1600, 'AWD', 250, 'Esportivo', 'Gasolina', 200000.00, 'images/audi.jpg');