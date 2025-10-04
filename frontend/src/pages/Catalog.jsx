import CarCard from "../components/CarCard";

const cars = [
  { id: 1, name: "Tesla Model 3", year: 2023, price: 40000 },
  { id: 2, name: "BMW i4", year: 2024, price: 55000 }
];

export default function Catalog() {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}