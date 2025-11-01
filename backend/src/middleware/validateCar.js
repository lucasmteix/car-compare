const validateCar = (req, res, next) => {
    const{
        modelo,
        marca,
        potencia,
        torque,
        peso,
        tracao,
        vmax,
        categoria
    } = req.body;

    const errors = [];

    if (!modelo || modelo.trim().length < 2) errors.push("Modelo Inválido");
    if (!marca || marca.trim().length < 2) errors.push("Marca Inválida");
    if (!potencia || potencia < 50) errors.push("Potencia minima: 50cv");
    if (!torque || torque < 50) errors.push("Torque minimo: 50Nm");
    if (!peso || peso < 500) errors.push("Peso minimo: 500Kg");
    if (!potencia || potencia < 50) errors.push("Potencia minima: 50cv");

    const validTraction = ['FWD', 'RWD', 'AWD', '4WD'];
    const validCategory = ['Hatch', 'Sedan', 'SUV', 'Pickup', 'Esportivo', 'Elétrico', 'Híbrido'];

  if (!validTraction.includes(tracao)) errors.push("Tração inválida");
  if (!validCategory.includes(categoria)) errors.push("Categoria inválida");
  if (!vmax || vmax < 100) errors.push("Vel. máx. mínima: 100km/h");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // CONVERTER PARA INGLÊS (BANCO)
  req.body = {
    model: modelo,
    brand: marca,
    power_hp: potencia,
    torque_nm: torque,
    weight_kg: peso,
    traction: tracao,
    top_speed_kmh: vmax,
    category: categoria,
  };


  next();
};

module.exports = validateCar;





