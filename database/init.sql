USE carcompare;

CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    power_hp INT NOT NULL,
    torque_nm INT NOT NULL,
    weight_kg INT NOT NULL,
    traction ENUM('FWD', 'RWD', 'AWD', '4WD') NOT NULL,
    top_speed_kmh INT NOT NULL,
    category ENUM('Hatch', 'Sedan', 'SUV', 'Pickup', 'Esportivo', 'Elétrico', 'Híbrido') NOT NULL
);

INSERT INTO cars (model, brand, power_hp, torque_nm, weight_kg, traction, top_speed_kmh, category) VALUES
('Civic', 'Honda', 155, 190, 1250, 'FWD', 200, 'Sedan'),
('Golf GTI', 'Volkswagen', 230, 350, 1350, 'FWD', 245, 'Hatch'),
('Corolla', 'Toyota', 177, 210, 1300, 'FWD', 210, 'Sedan');