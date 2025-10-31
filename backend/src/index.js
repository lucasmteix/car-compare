const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const cars = [
  { id: 1, modelo: "Civic", marca: "Honda", potencia: "155 cv", torque: "19 kgfm", peso: "1250 kg", tracao: "Dianteira", vmax: "200 km/h", categoria: "Sedan" },
  { id: 2, modelo: "Golf GTI", marca: "Volkswagen", potencia: "230 cv", torque: "35 kgfm", peso: "1350 kg", tracao: "Dianteira", vmax: "245 km/h", categoria: "Hatch" },
  { id: 3, modelo: "Corolla", marca: "Toyota", potencia: "177 cv", torque: "21 kgfm", peso: "1300 kg", tracao: "Dianteira", vmax: "210 km/h", categoria: "Sedan" }
];

app.get("/", (req, res) => {
  res.send("API CarCompare está rodando! Use /cars para ver os carros.");
});

app.get("/cars", (req, res) => {
  res.json(cars);
});

app.get("/cars/:id", (req, res) => {
  const car = cars.find(c => c.id == req.params.id);
  if (car) res.json(car);
  else res.status(404).json({ error: "Carro não encontrado" });
});

app.get("/compare/:id1/:id2", (req, res) => {
  const car1 = cars.find(c => c.id == req.params.id1);
  const car2 = cars.find(c => c.id == req.params.id2);

  if (!car1 || !car2)
    return res.status(404).json({ error: "Um dos carros não foi encontrado" });

  const result = {
    modelos: `${car1.modelo} vs ${car2.modelo}`,
    potencia: `${car1.potencia} / ${car2.potencia}`,
    torque: `${car1.torque} / ${car2.torque}`,
    categoria: `${car1.categoria} / ${car2.categoria}`
  };

  res.json(result);
});

app.get("/brands", (req, res) => {
  const marcas = [...new Set(cars.map(c => c.marca))];
  res.json(marcas);
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
