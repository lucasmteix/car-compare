const validateCar = (req, res, next) => {
    const{
        modelo,
        marca,
        ano,
        potencia,
        torque,
        peso,
        tracao,
        vmax,
        categoria,
        tipo_combustivel,
        preco,
        imagem_url,
        km_l_city,
        km_l_road,
        wh_km_city,
        wh_km_road
    } = req.body;

    const errors = [];

    if (!modelo || modelo.trim().length < 2) errors.push("Modelo Inválido");
    if (!marca || marca.trim().length < 2) errors.push("Marca Inválida");
    if (!ano || ano < 1900 || ano > new Date().getFullYear() + 1) errors.push("Ano inválido (1900 - ano atual +1)");
    if (!potencia || potencia < 50) errors.push("Potência mínima: 50cv");
    if (!torque || torque < 50) errors.push("Torque mínimo: 50Nm");
    if (!peso || peso < 500) errors.push("Peso mínimo: 500Kg");
    if (!vmax || vmax < 80) errors.push("Vel. máx. mínima: 80km/h");
    if (!tipo_combustivel || tipo_combustivel.trim().length < 3) errors.push("Tipo de combustível inválido");
    if (!preco || preco < 1000) errors.push("Preço mínimo: 1000");

    const validTraction = ['FWD', 'RWD', 'AWD', '4WD'];
    const validCategory = ['Hatch', 'Sedan', 'SUV', 'Pickup', 'Esportivo', 'Elétrico', 'Híbrido'];
    const validFuelType = ['Gasolina', 'Diesel', 'Elétrico', 'Álcool', 'Híbrido'];

    if (!validTraction.includes(tracao)) errors.push("Tração inválida");
    if (!validCategory.includes(categoria)) errors.push("Categoria inválida");
    if (!validFuelType.includes(tipo_combustivel)) errors.push("Tipo de combustível inválido");

    const fuel = tipo_combustivel;

    // REGRAS: COMBUSTÃO
    if (["Gasolina", "Diesel", "Álcool"].includes(fuel)) {
        if (km_l_city == null || km_l_road == null) {
            errors.push("Carros de combustão precisam de km_l_city e km_l_road.");
        }

        if (wh_km_city != null || wh_km_road != null) {
            errors.push("Carros de combustão NÃO devem ter Wh/km.");
        }
    }

    // REGRAS: ELÉTRICO
    if (fuel === "Elétrico") {
        if (wh_km_city == null || wh_km_road == null) {
            errors.push("Carros elétricos precisam de wh_km_city e wh_km_road.");
        }
        if (km_l_city != null || km_l_road != null) {
            errors.push("Carros elétricos NÃO devem ter km/l.");
        }
    }

    // REGRAS: HÍBRIDO
    if (fuel === "Híbrido") {
        if (km_l_city == null || km_l_road == null) {
            errors.push("Carros híbridos precisam de km_l_city e km_l_road.");
        }
        if (wh_km_city == null || wh_km_road == null) {
            errors.push("Carros híbridos precisam de wh_km_city e wh_km_road.");
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    req.body = {
        model: modelo,
        brand: marca,
        year: ano,
        power_hp: potencia,
        torque_nm: torque,
        weight_kg: peso,
        traction: tracao,
        top_speed_kmh: vmax,
        category: categoria,
        fuel_type: tipo_combustivel,
        price: preco,
        image_url: imagem_url || null,
        km_l_city: km_l_city || null,
        km_l_road: km_l_road || null,
        wh_km_city: wh_km_city || null,
        wh_km_road: wh_km_road || null
    };

    next();
};

module.exports = validateCar;
