const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const cars = [
  { id: 1, modelo: "Civic", potencia: "155 cv", torque: "19 kgfm", peso: "1250 kg", tracao: "Dianteira", vmax: "200 km/h", categoria: "Sedan" },
  { id: 2, modelo: "Golf GTI", potencia: "230 cv", torque: "35 kgfm", peso: "1350 kg", tracao: "Dianteira", vmax: "245 km/h", categoria: "Hatch" }
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

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
